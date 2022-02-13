import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Group, Link, Section} from "../../../../../models/dto/bookmark.model";
import {ModalComponent} from "../../shared/modal/modal.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LinkService} from "../../services/link.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'bh-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})
export class LinkFormComponent {

  private _linkToEdit?: Link;
  public editMode: boolean = false;

  @Input() public section?: Section;
  @Input() public group?: Group;
  @Output() public closed = new EventEmitter<Section>();
  @ViewChild('modal') modal?: ModalComponent;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;
  public titleControl: FormControl;
  public urlControl: FormControl;
  public faviconUrlControl: FormControl;

  constructor(private linkService: LinkService,
              private fb: FormBuilder) {

    this.titleControl = this.fb.control({
      value: '',
      disabled: this.isLoading,
    }, [Validators.required]);

    this.urlControl = this.fb.control({
      value: '',
      disabled: this.isLoading,
    }, [Validators.required]);

    this.faviconUrlControl = this.fb.control({
      value: '',
      disabled: this.isLoading,
    }, [Validators.required]);

    this.form = this.fb.group({
      'titleControl': this.titleControl,
      'urlControl': this.urlControl,
      'faviconUrlControl': this.faviconUrlControl,
    });

  }

  @Input()
  public set linkToEdit(link: Link | undefined) {
    if (link) {
      this._linkToEdit = link;
      this.initLink(this._linkToEdit);
      this.editMode = true;
    }
  }

  public onSubmit(): void {
    this.titleControl.setValue(this.titleControl.value.trim());
    this.unknownErrorOccurred = false;
    this.isLoading = true;
    if (this.editMode) {
      this.updateLink();
    } else {
      this.addNewLink();
    }
  }

  private addNewLink(): void {
    if (!this.section || !this.group) {
      this.unknownErrorOccurred = true;
      return;
    }

    this.linkService.createLink(this.section, this.group, this.titleControl.value, this.urlControl.value, this.faviconUrlControl.value).pipe(first()).subscribe(_ => {
      this.handleSuccessGroupSubmit();
    }, error => {
      this.isLoading = false;
      if (error) {
        this.unknownErrorOccurred = true;
      }
    });
  }

  private updateLink(): void {
    if (!this.section || !this.group) {
      this.unknownErrorOccurred = true;
      return;
    }

    if (this._linkToEdit && this._linkToEdit.uuid) {
      this.linkService.updateLink(this.section, this.group, this._linkToEdit.uuid, this.titleControl.value, this.urlControl.value, this.faviconUrlControl.value).pipe(first()).subscribe(_ => {
        this.handleSuccessGroupSubmit();
      }, error => {
        this.isLoading = false;
        if (error) {
          this.unknownErrorOccurred = true;
        }
      });
    } else {
      console.error('section to edit is empty or has no uuid');
    }
  }

  private handleSuccessGroupSubmit(): void {
    this.isLoading = false;
    this.dismiss();
    this.unknownErrorOccurred = false;
  }

  public onClosed(): void {
    this.closed.emit();
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.initLink(this._linkToEdit);
    this.modal?.open();
  }

  private initLink(link?: Link): void {
    this.titleControl?.setValue(link?.title);
    this.urlControl?.setValue(link?.url);
    this.faviconUrlControl?.setValue(link?.faviconUrl);
  }

}
