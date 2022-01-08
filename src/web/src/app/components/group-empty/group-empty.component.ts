import {Component, Input, ViewChild} from '@angular/core';
import {GroupFormComponent} from "../group-form/group-form.component";
import {Section} from "../../../../../models/dto/bookmark.model";

@Component({
  selector: 'bh-group-empty',
  templateUrl: './group-empty.component.html',
  styleUrls: ['./group-empty.component.scss']
})
export class GroupEmptyComponent {

  @ViewChild('groupForm') groupForm?: GroupFormComponent;

  @Input() public section?: Section;

}
