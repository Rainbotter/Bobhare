import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/app/models/bookmark.model';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mockBookmark: Bookmark = {
    'title': 'toto',
    links: [{
      'text': 'oui',
      'url': 'https://www.youtube.com'
    }]
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.registerUser().subscribe();
  }

}
