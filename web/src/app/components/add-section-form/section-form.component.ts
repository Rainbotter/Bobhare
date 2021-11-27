import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Section } from '../../models/bookmark.model'
import { NgForm } from '@angular/forms'
import { first } from 'rxjs/operators'
import { BookmarkService } from '../../services/bookmark.service'

@Component({
  selector: 'bh-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  public r = Math.floor(Math.random() * (999999 - 100000)) + 100000

  private _sectionToEdit?: Section
  public editMode: boolean = false

  @Output() public closed = new EventEmitter<Section>()

  public newSection: Section = this.initSection()

  @ViewChild('openAddSectionModalBtn', { static: true }) openAddSectionModalBtn?: ElementRef

  @ViewChild('closeBtn', { static: true }) closeModal?: ElementRef

  @ViewChild('addNewSectionForm', { static: true }) addNewSectionForm?: NgForm

  public isLoading: boolean = false
  public unknownErrorOccurred: boolean = false

  constructor (private bookmarkService: BookmarkService) {
  }

  public ngOnInit (): void {
  }

  @Input()
  public set sectionToEdit (section: Section) {
    if (section) {
      this._sectionToEdit = section
      this.newSection = this.initSection(this._sectionToEdit)
      this.editMode = true
    }
  }

  @Input()
  public set isOpen (value: boolean) {
    if (value) {
      this.newSection = this.initSection(this._sectionToEdit)
      this.open()
    } else {
      this.dismiss()
    }
  }

  public onHidden (): void {
    this.closed.emit()
  }

  public onSubmit (): void {
    this.newSection.title = this.newSection.title.trim()
    this.unknownErrorOccurred = false
    if (this.addNewSectionForm?.valid) {
      this.isLoading = true
      if (this.editMode) {
        this.updateSection()
      } else {
        this.addNewSection()
      }
    }
  }

  private addNewSection (): void {
    this.bookmarkService.addNewSection(this.newSection).pipe(first()).subscribe(value => {
      this.isLoading = false
      this.dismiss()
      this.unknownErrorOccurred = false
    }, error => {
      this.isLoading = false
      if (error) {
        this.unknownErrorOccurred = true
      }
    })
  }

  private updateSection (): void {
    this.bookmarkService.updateSection(this.newSection).pipe(first()).subscribe(value => {
      this.isLoading = false
      this.dismiss()
      this.unknownErrorOccurred = false
      if (this._sectionToEdit) {
        this._sectionToEdit.title = this.newSection.title
      }
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

  private initSection (section?: Section): Section {
    return {
      title: section?.title || '',
      groups: []
    }
  }

  public modalId (): string {
    return 'addSectionModal' + this.r
  }

}
