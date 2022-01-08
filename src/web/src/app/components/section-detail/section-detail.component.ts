import {Component, Input, ViewChild} from '@angular/core';
import {SectionFormComponent} from "../section-form/section-form.component";
import {GroupFormComponent} from "../group-form/group-form.component";
import {Section} from "../../../../../models/dto/bookmark.model";
import {SectionDeleteComponent} from "../section-delete/section-delete.component";

@Component({
  selector: 'bh-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent {

  @Input() public section?: Section;

  @ViewChild('sectionForm') sectionForm?: SectionFormComponent;
  @ViewChild('deleteSectionForm') deleteSectionForm?: SectionDeleteComponent;
  @ViewChild('groupForm') groupForm?: GroupFormComponent;

  public displayEdit: boolean = false;

  public openSectionForm(): void {
    this.sectionForm?.open();
  }

  public openDeleteSectionForm(): void {
    this.deleteSectionForm?.open();
  }

  public openGroupForm(): void {
    this.groupForm?.open();
  }

}
