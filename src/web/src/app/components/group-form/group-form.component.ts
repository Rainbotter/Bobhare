import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group, Section} from "../../models/bookmark.model";
import {ModalComponent} from "../../shared/modal/modal.component";

@Component({
  selector: 'bh-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  @Input() public group?: Group;
  @Output() public closed = new EventEmitter<Section>();

  @ViewChild('modal', {static: true}) modal?: ModalComponent;

  public isEditModalOpen: boolean = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

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
