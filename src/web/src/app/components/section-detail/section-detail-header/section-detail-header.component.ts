import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Section} from "../../../models/bookmark.model";

@Component({
  selector: 'bh-section-detail-header',
  templateUrl: './section-detail-header.component.html',
  styleUrls: ['./section-detail-header.component.scss']
})
export class SectionDetailHeaderComponent {

  @Input() public section?: Section;
  @Output() public onEditSection = new EventEmitter<void>();
  @Output() public onAddGroup = new EventEmitter<void>();

  public onClickOnOpenSectionForm(): void {
    this.onEditSection.emit();
  }

  public onClickOnAddGroup(): void {
    this.onAddGroup.emit();
  }

}
