import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Section} from "../../../../../models/dto/bookmark.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'bh-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.scss']
})
export class GroupDeleteComponent {

  @ViewChild('modal') modal?: ModalComponent;
  @Output() public closed = new EventEmitter<Section>();
  @Input() public section?: Section;
  @Input() public groupUuid?: string;

  public isLoading: boolean = false;
  public unknownErrorOccurred: boolean = false;

  public form: FormGroup;

  constructor(private groupService: GroupService,
              private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  public onClosed(): void {
    this.closed.emit();
  }

  public onSubmit(): void {
    if (this.section && this.groupUuid) {
      this.isLoading = true;
      this.groupService.deleteGroup(this.section, this.groupUuid).subscribe(
        () => {
          this.isLoading = false;
          this.dismiss();
          this.unknownErrorOccurred = false;
        },
        error => {
          this.isLoading = false;
          if (error) {
            this.unknownErrorOccurred = true;
          }
        });
    }
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.modal?.open();
  }


}
