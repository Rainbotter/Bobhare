import {Component, Input} from '@angular/core';
import {Group} from "../../models/bookmark.model";

@Component({
  selector: 'bh-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent {

  @Input() group?: Group;

  public calculateAppropriateFontColor(group: Group): string {
    const r: number = Number("0x" + group.color.substr(1, 2));
    const g: number = Number("0x" + group.color.substr(3, 2));
    const b: number = Number("0x" + group.color.substr(5, 2));
    const total: number = r + g + b;

    if (total > Number(400)) {
      return 'black';
    } else {
      return 'white';
    }
  }

}
