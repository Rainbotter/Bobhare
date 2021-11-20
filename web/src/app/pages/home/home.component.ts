import { Component, OnInit } from '@angular/core'
import { Group } from 'src/app/models/bookmark.model'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  groups: Group[] = [{
    'title': 'Group 1',
    bookmarks: [
      {
        'title': 'Bookmark 1',
        link: {
          'text': 'oui',
          'url': 'https://www.youtube.com'
        }
      }
    ]
  }]

  constructor () {
  }

  ngOnInit (): void {
  }

}
