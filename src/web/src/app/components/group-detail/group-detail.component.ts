import { Component, Input, ViewChild } from '@angular/core';
import { Group, Section } from '../../../../../models/dto/bookmark.model';
import { GroupDeleteComponent } from '../group-delete/group-delete.component';
import {GroupFormComponent} from "../group-form/group-form.component";
import {LinksFormComponent} from "../links-form/links-form.component";

@Component({
  selector: 'bh-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent {

  @Input() group?: Group;
  @Input() section?: Section;

  @ViewChild('deleteGroupForm') deleteGroupForm?: GroupDeleteComponent;
  @ViewChild('editGroupForm') editGroupForm?: GroupFormComponent;
  @ViewChild('linksForm') linksForm?: LinksFormComponent;

  public calculateAppropriateFontColor(group: Group): string {
    const r: number = Number('0x' + group.color.substring(1, 3));
    const g: number = Number('0x' + group.color.substring(3, 4));
    const b: number = Number('0x' + group.color.substring(5));
    const total: number = r + g + b;

    if (total > Number(400)) {
      return 'black';
    } else {
      return 'white';
    }
  }

  public openDeleteGroupForm(): void {
    this.deleteGroupForm?.open();
  }

  public openEditGroupForm(): void {
    this.editGroupForm?.open();
  }

  public openNewLinkForm(): void {
    this.linksForm?.open();
  }

}
