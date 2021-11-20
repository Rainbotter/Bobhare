import { Component, Input, OnInit } from '@angular/core'
import { Bookmark, Group } from '../../models/bookmark.model'

@Component({
  selector: 'bh-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @Input() group?: Group

  constructor() { }

  ngOnInit(): void {
  }

}
