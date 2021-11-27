import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Section } from '../../models/bookmark.model'
import { BookmarkService } from '../../services/bookmark.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public section?: Section

  private subscriptions: Subscription[] = []

  constructor (private route: ActivatedRoute, private bookmarkService: BookmarkService) {
  }

  public ngOnInit (): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params.section) {
        this.section = this.bookmarkService.getSection(params.section)
      } else {
        this.section = this.bookmarkService.getSectionAtIndex(0)
      }
    }))
  }

  public ngOnDestroy (): void {
    this.subscriptions.forEach(value => value.unsubscribe())
  }

}
