import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Section } from '../../models/bookmark.model'
import { NgForm } from '@angular/forms'
import { first } from 'rxjs/operators'
import { BookmarkService } from '../../services/bookmark.service'

@Component({
  selector: 'bh-add-section-form',
  templateUrl: './add-section-form.component.html',
  styleUrls: ['./add-section-form.component.scss']
})
export class AddSectionFormComponent implements OnInit {

  @Output() public newSectionAdded = new EventEmitter<Section>()

  @Output() public closed = new EventEmitter<Section>()

  public newSection: Section = this.initSection()

  @ViewChild('openAddSectionModalBtn', { static: true }) openAddSectionModalBtn?: ElementRef

  @ViewChild('closeBtn', { static: true }) closeModal?: ElementRef

  @ViewChild('addNewSectionForm', { static: true }) addNewSectionForm?: NgForm

  public isLoading: boolean = false
  public unknownErrorOccurred: boolean = false

  constructor (private bookmarkService: BookmarkService) {
  }

  ngOnInit (): void {
  }

  @Input()
  public set isOpen (value: boolean) {
    if (value) {
      this.open()
    } else {
      this.dismiss()
    }
  }

  public onHidden (): void {
    this.newSection = this.initSection()
    this.closed.emit()
  }

  public onSubmit (): void {
    this.unknownErrorOccurred = false
    if (this.addNewSectionForm?.valid) {
      this.isLoading = true
      this.newSection.title.trim()
      this.addNewSection()
    }
  }

  private addNewSection (): void {
    this.bookmarkService.addNewSection(this.newSection).pipe(first()).subscribe(value => {
      this.isLoading = false
      this.dismiss()
      this.newSectionAdded.emit(this.newSection)
      this.unknownErrorOccurred = false
    }, error => {
      this.isLoading = false
      if (error) {
        this.unknownErrorOccurred = true
      }
    })
  }

  public dismiss (): void {
    this.closeModal?.nativeElement.click()
  }

  public open (): void {
    this.openAddSectionModalBtn?.nativeElement.click()
  }

  private initSection (): Section {
    return {
      title: '',
      groups: []
    }
  }

}
