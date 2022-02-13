import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group, Link, Section} from "../../../../../../models/dto/bookmark.model";
import {LinkFormComponent} from "../../link-form/link-form.component";
import {LinkDeleteComponent} from "../../link-delete/link-delete.component";

@Component({
  selector: 'bh-links-form-item',
  templateUrl: './links-form-item.component.html',
  styleUrls: ['./links-form-item.component.scss']
})
export class LinksFormItemComponent {

  @Output() public editLink = new EventEmitter<Link>();
  @Output() public deleteLink = new EventEmitter<Link>();

  @Input() public section?: Section;
  @Input() public group?: Group;
  @Input() public link: Link = {
    url: "",
    title: ""
  };

  constructor() {
  }

  public onEditLink(): void {
    this.editLink.emit(this.link);
  }

  public onDeleteLink(): void {
    this.deleteLink.emit(this.link);
  }

}
