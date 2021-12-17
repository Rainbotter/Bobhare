import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section} from '../../../models/bookmark.model';

@Component({
  selector: 'bh-section-detail-header',
  templateUrl: './section-detail-header.component.html',
  styleUrls: ['./section-detail-header.component.scss']
})
export class SectionDetailHeaderComponent implements OnInit {

  @Input() public section?: Section;
  @Output() public onEditSection = new EventEmitter<void>();
  @Output() public onAddGroup = new EventEmitter<void>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public onClickOnOpenSectionForm(): void {
    this.onEditSection.emit();
  }

  public onClickOnAddGroup(): void {
    this.onAddGroup.emit();
  }

}
