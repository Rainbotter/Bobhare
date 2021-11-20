import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark.model';

@Component({
  selector: 'bh-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit {

  @Input() bookmark?: Bookmark

  constructor() { }

  ngOnInit(): void {
  }

}
