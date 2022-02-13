import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Group, Link, Section} from "../../../../../models/dto/bookmark.model";
import {LinkFormComponent} from "../link-form/link-form.component";
import {ModalComponent} from "../../shared/modal/modal.component";
import {LinkDeleteComponent} from "../link-delete/link-delete.component";

@Component({
  selector: 'bh-links-form',
  templateUrl: './links-form.component.html',
  styleUrls: ['./links-form.component.scss']
})
export class LinksFormComponent implements OnInit {

  public currentLink?: Link;

  @Input() public section?: Section;
  @Input() public group?: Group;

  @Output() public closed = new EventEmitter<Section>();

  @ViewChild('modal') modal?: ModalComponent;
  @ViewChild('newLinkForm') newLinkForm?: LinkFormComponent;
  @ViewChild('editLinkForm') editLinkForm?: LinkFormComponent;
  @ViewChild('deleteLinkForm') deleteLinkForm?: LinkDeleteComponent;

  constructor() { }

  ngOnInit(): void {
  }

  public onClosed(): void {
    this.closed.emit();
  }

  public dismiss(): void {
    this.modal?.dismiss();
  }

  public openNewLinkForm():void {
    this.newLinkForm?.open();
  }

  public open(): void {
    this.modal?.open();
  }

  public linkFormClosed(): void {
    this.open();
  }

  public onDeleteLink(link: Link): void {
    this.currentLink = link;
    this.deleteLinkForm?.open();
  }

  public onEditLink(link: Link): void {
    this.currentLink = link;
    this.editLinkForm?.open();
  }

}
