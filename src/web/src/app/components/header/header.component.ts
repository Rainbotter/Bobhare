import {Component, Input, OnDestroy, ViewChild} from '@angular/core';
import {StringService} from '../../services/string.service';
import {BookmarkService} from '../../services/bookmark.service';
import {Subscription} from 'rxjs';
import {SectionFormComponent} from "../section-form/section-form.component";
import {Section} from "../../../../../models/dto/bookmark.model";

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  @Input() public bookmarks: Section[] = [];

  @ViewChild('sectionForm') sectionForm?: SectionFormComponent;

  private subscriptions: Subscription[] = [];

  constructor(private stringService: StringService, private bookmarkService: BookmarkService) {
    this.subscriptions.push(this.bookmarkService.sections.subscribe(value => this.bookmarks = value));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  public slugify(value: string): string {
    return this.stringService.slugify(value);
  }

  public openNewSectionForm(): void {
    this.sectionForm?.open();
  }

}
