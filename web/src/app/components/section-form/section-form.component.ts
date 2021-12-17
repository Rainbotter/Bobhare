import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {Section} from '../../models/bookmark.model'
import {first} from 'rxjs/operators'
import {BookmarkService} from '../../services/bookmark.service'
import {ModalComponent} from "../../shared/modal/modal.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {StringService} from "../../services/string.service";

@Component({
  selector: 'bh-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  private _sectionToEdit?: Section
  public editMode: boolean = false

  @Output() public closed = new EventEmitter<Section>()
  @ViewChild('modal') modal?: ModalComponent

  public isLoading: boolean = false
  public unknownErrorOccurred: boolean = false

  public form: FormGroup;
  public titleControl: FormControl;

  constructor(private bookmarkService: BookmarkService,
              private fb: FormBuilder,
              private stringService: StringService,
              private router: Router) {
    this.titleControl = this.fb.control({
      value: '',
      disabled: this.isLoading
    }, [Validators.required]);
    this.form = this.fb.group({
      'titleControl': this.titleControl
    });

  }

  public ngOnInit(): void {
  }

  @Input()
  public set sectionToEdit(section: Section) {
    if (section) {
      this._sectionToEdit = section
      this.initSection(this._sectionToEdit)
      this.editMode = true
    }
  }

  public onClosed(): void {
    this.closed.emit()
  }

  public onSubmit(): void {
    this.titleControl.setValue(this.titleControl.value.trim())
    this.unknownErrorOccurred = false
    this.isLoading = true
    if (this.editMode) {
      this.updateSection()
    } else {
      this.addNewSection()
    }
  }

  private addNewSection(): void {
    const tempSection: Section = {
      title: this.titleControl.value,
      groups: [],
    }
    this.bookmarkService.addNewSection(tempSection).pipe(first()).subscribe(section => {
      this.isLoading = false
      this.dismiss()
      this.unknownErrorOccurred = false
      this.router.navigate([`/${this.stringService.slugify(section.title)}`]);
    }, error => {
      this.isLoading = false
      if (error) {
        this.unknownErrorOccurred = true
      }
    })
  }

  private updateSection(): void {
    const tempSection: Section = {
      title: this.titleControl.value,
      groups: this._sectionToEdit?.groups || [],
      id: this._sectionToEdit?.id
    }
    this.bookmarkService.updateSection(tempSection).pipe(first()).subscribe(section => {
      this.isLoading = false
      this.dismiss()
      this.unknownErrorOccurred = false
      if (this._sectionToEdit) {
        this._sectionToEdit.title = this.titleControl.value
      }
      this.router.navigate([`/${this.stringService.slugify(section.title)}`]);
    }, error => {
      this.isLoading = false
      if (error) {
        this.unknownErrorOccurred = true
      }
    })
  }

  public dismiss(): void {
    this.modal?.dismiss()
  }

  public open(): void {
    this.initSection(this._sectionToEdit)
    this.modal?.open();
  }

  private initSection(section?: Section): void {
    this.titleControl?.setValue(section?.title)
  }

}
