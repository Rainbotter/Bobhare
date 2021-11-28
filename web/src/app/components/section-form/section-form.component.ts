import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {Section} from '../../models/bookmark.model'
import {first} from 'rxjs/operators'
import {BookmarkService} from '../../services/bookmark.service'
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'bh-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  private _sectionToEdit?: Section
  public editMode: boolean = false

  @Output() public closed = new EventEmitter<Section>()

  @ViewChild('modal1', {static: true}) modal?: ModalComponent

  public newSection: Section = this.initSection()

  public isLoading: boolean = false
  public unknownErrorOccurred: boolean = false

  constructor(private bookmarkService: BookmarkService) {
  }

  public ngOnInit(): void {
  }

  @Input()
  public set sectionToEdit(section: Section) {
    if (section) {
      this._sectionToEdit = section
      this.newSection = this.initSection(this._sectionToEdit)
      this.editMode = true
    }
  }

  public onClosed(): void {
    this.closed.emit()
  }

  public onSubmit(event: any): void {
    console.log(event)
    this.newSection.title = this.newSection.title.trim()
    this.unknownErrorOccurred = false
    this.isLoading = true
    if (this.editMode) {
      this.updateSection()
    } else {
      this.addNewSection()
    }
  }

  private addNewSection(): void {
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

  private updateSection(): void {
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

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.newSection = this.initSection(this._sectionToEdit)
    this.modal?.open();
  }

  private initSection(section?: Section): Section {
    return {
      title: section?.title || '',
      groups: []
    }
  }

}
