import {Component, Input} from '@angular/core';
import {Group, Section} from '../../../../../models/dto/bookmark.model';

@Component({
  selector: 'bh-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent {

  @Input() group?: Group;
  @Input() section?: Section;

  public calculateAppropriateFontColor(group: Group): string {
    const r: number = Number("0x" + group.color.substring(1, 2));
    const g: number = Number("0x" + group.color.substring(3, 4));
    const b: number = Number("0x" + group.color.substring(5, 6));
    const total: number = r + g + b;

    if (total > Number(400)) {
      return 'black';
    } else {
      return 'white';
    }
  }

}
