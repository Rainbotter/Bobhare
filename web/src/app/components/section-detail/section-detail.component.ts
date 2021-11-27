import { Component, Input, OnInit } from '@angular/core'
import { Section } from '../../models/bookmark.model'

@Component({
  selector: 'bh-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent implements OnInit {

  @Input() public section?: Section
  public isNewSectionFormOpened: boolean = false
  public displayEdit: boolean = false

  constructor () {
  }

  public ngOnInit (): void {
  }

  public openSectionForm (): void {
    this.isNewSectionFormOpened = true
  }

  public sectionFormClosed (): void {
    this.isNewSectionFormOpened = false
  }

  public setDisplayEdit (value: boolean): void {
    this.displayEdit = value
  }

}
