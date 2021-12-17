import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Section} from '../../models/bookmark.model';
import {SectionFormComponent} from "../section-form/section-form.component";
import {GroupFormComponent} from "../group-form/group-form.component";

@Component({
  selector: 'bh-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent implements OnInit {

  @Input() public section?: Section;

  @ViewChild('sectionForm') sectionForm?: SectionFormComponent;
  @ViewChild('groupForm') groupForm?: GroupFormComponent;

  public displayEdit: boolean = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public openSectionForm(): void {
    this.sectionForm?.open();
  }

  public openGroupForm(): void {
    this.groupForm?.open();
  }

}
