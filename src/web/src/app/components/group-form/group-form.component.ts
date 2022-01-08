import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Group, Section} from "../../../../../models/dto/bookmark.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'bh-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent {


  private _groupToEdit?: Group;
  public editMode: boolean = false;

  @Input() public section?: Section;
  @Output() public closed = new EventEmitter<Section>();
  @ViewChild('modal') modal?: ModalComponent;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;
  public titleControl: FormControl;
  public colorControl: FormControl;

  constructor(private groupService: GroupService,
              private fb: FormBuilder) {

    this.titleControl = this.fb.control({
      value: '',
      disabled: this.isLoading
    }, [Validators.required]);

    this.colorControl = this.fb.control({
      value: '#000000',
      disabled: this.isLoading
    }, [Validators.required]);

    this.form = this.fb.group({
      'titleControl': this.titleControl,
      'colorControl': this.colorControl,
    });

  }

  @Input()
  public set groupToEdit(group: Group) {
    if (group) {
      this._groupToEdit = group;
      this.initGroup(this._groupToEdit);
      this.editMode = true;
    }
  }

  public onSubmit(): void {
    this.titleControl.setValue(this.titleControl.value.trim());
    this.unknownErrorOccurred = false;
    this.isLoading = true;
    if (this.editMode) {
      this.updateGroup();
    } else {
      this.addNewGroup();
    }
  }

  private addNewGroup(): void {
    if (!this.section) {
      this.unknownErrorOccurred = true;
      return;
    }

    this.groupService.createGroup(this.section, this.titleControl.value, this.colorControl.value).pipe(first()).subscribe(_ => {
      this.handleSuccessGroupSubmit();
    }, error => {
      this.isLoading = false;
      if (error) {
        this.unknownErrorOccurred = true;
      }
    });
  }

  private updateGroup(): void {
    if (!this.section) {
      this.unknownErrorOccurred = true;
      return;
    }

    if (this._groupToEdit && this._groupToEdit.uuid) {
      this.groupService.updateGroup(this.section, this._groupToEdit.uuid, this.titleControl.value, this.colorControl.value).pipe(first()).subscribe(_ => {
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
    this.initGroup(this._groupToEdit);
    this.modal?.open();
  }

  private initGroup(group?: Group): void {
    this.titleControl?.setValue(group?.title);
    this.colorControl?.setValue(group?.color);
  }

}
