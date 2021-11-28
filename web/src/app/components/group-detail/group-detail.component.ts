import {Component, Input, OnInit} from '@angular/core';
import {Group} from "../../models/bookmark.model";

@Component({
  selector: 'bh-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  @Input() group?: Group

  constructor() {
  }

  public ngOnInit(): void {
  }

  public calculateAppropriateFontColor(group: Group): string {
    let r: number = Number("0x" + group.color.substr(1, 2));
    let g: number = Number("0x" + group.color.substr(3, 2));
    let b: number = Number("0x" + group.color.substr(5, 2));
    let total: number = r + g + b;

    if (total > Number(400)) {
      return 'black'
    } else {
      return 'white'
    }
  }

}
