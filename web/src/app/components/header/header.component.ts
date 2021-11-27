import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { Section } from '../../models/bookmark.model'
import { StringService } from '../../services/string.service'
import { BookmarkService } from '../../services/bookmark.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() public bookmarks: Section[] = []

  public isNewSectionFormOpened: boolean = false

  private subscriptions: Subscription[] = []

  constructor (private stringService: StringService, private bookmarkService: BookmarkService) {
    this.subscriptions.push(this.bookmarkService.bookmarks.subscribe(value => this.bookmarks = value))
  }

  public ngOnInit (): void {
  }

  public ngOnDestroy () {
    this.subscriptions.forEach(value => value.unsubscribe())
  }

  public slugify (value: string): string {
    return this.stringService.slugify(value)
  }

  public openNewSectionForm (): void {
    this.isNewSectionFormOpened = true
  }

  public newSectionFormClosed (): void {
    this.isNewSectionFormOpened = false
  }

}
