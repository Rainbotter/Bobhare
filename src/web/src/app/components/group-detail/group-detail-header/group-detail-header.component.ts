import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group, Section } from '../../../../../../models/dto/bookmark.model';

@Component({
  selector: 'bh-group-detail-header',
  templateUrl: './group-detail-header.component.html',
  styleUrls: ['./group-detail-header.component.scss'],
})
export class GroupDetailHeaderComponent {

  @Input() color?: string;
  @Input() group?: Group;
  @Input() section?: Section;

  @Output() public onEditGroup = new EventEmitter<void>();
  @Output() public onDeleteGroup = new EventEmitter<void>();
  @Output() public onEditLinks = new EventEmitter<void>();

  private r = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  public collapsibleId(): string {
    return 'collapsible_' + this.r;
  }

  public onClickOnEditGroup(): void {
    this.onEditGroup.emit();
  }

  public onClickOnDeleteGroup(): void {
    this.onDeleteGroup.emit();
  }

  public onClickOnEditLinks(): void {
    this.onEditLinks.emit();
  }

}
