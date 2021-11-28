import { Component, Input, OnInit } from '@angular/core'
import { Section } from '../../models/bookmark.model'

@Component({
  selector: 'bh-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent implements OnInit {

  @Input() public section?: Section
  public isEditSectionOpen: boolean = false
  public isAddGroupOpen: boolean = false
  public displayEdit: boolean = false

  constructor () {
  }

  public ngOnInit (): void {
  }

  public openSectionForm (): void {
    this.isEditSectionOpen = true
  }

  public openGroupForm (): void {
    this.isAddGroupOpen = true
  }

  public sectionFormClosed (): void {
    this.isEditSectionOpen = false
  }

}
