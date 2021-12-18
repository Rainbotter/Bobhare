import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../shared/modal/modal.component";
import {Group, Section} from "../../models/bookmark.model";

@Component({
  selector: 'bh-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent {

  @Input() public group?: Group;
  @Output() public closed = new EventEmitter<Section>();

  @ViewChild('modal', {static: true}) modal?: ModalComponent;

  public onClose(): void {
    this.closed.emit();
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public open(): void {
    this.modal?.open();
  }

}
