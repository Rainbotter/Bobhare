import {Component, Input} from '@angular/core';
import {Group} from "../../../../../../models/dto/bookmark.model";

@Component({
  selector: 'bh-group-detail-header',
  templateUrl: './group-detail-header.component.html',
  styleUrls: ['./group-detail-header.component.scss']
})
export class GroupDetailHeaderComponent {

  @Input() color?: string;
  @Input() group?: Group;

  private r = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  public collapsibleId(): string {
    return 'collapsible_' + this.r;
  }

}
