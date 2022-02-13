import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Section } from '../../../../../../models/dto/bookmark.model';
import {ApplicationService} from "../../../services/application.service";

@Component({
  selector: 'bh-section-detail-header',
  templateUrl: './section-detail-header.component.html',
  styleUrls: ['./section-detail-header.component.scss'],
})
export class SectionDetailHeaderComponent {

  @Input() public section?: Section;
  @Output() public onEditSection = new EventEmitter<void>();
  @Output() public onDeleteSection = new EventEmitter<void>();
  @Output() public onAddGroup = new EventEmitter<void>();

  constructor(private appService: ApplicationService) {
  }

  public onClickOnOpenSectionForm(): void {
    this.onEditSection.emit();
  }

  public onClickOnDeleteSection(): void {
    this.onDeleteSection.emit();
  }

  public onClickOnAddGroup(): void {
    this.onAddGroup.emit();
  }

  public isAuthenticated(): boolean {
    return this.appService.isAuthenticated();
  }

}
