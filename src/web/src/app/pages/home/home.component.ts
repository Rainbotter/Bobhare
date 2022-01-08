import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookmarkService} from '../../services/bookmark.service';
import {Subscription} from 'rxjs';
import {Section} from "../../../../../models/dto/bookmark.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sectionUuidToDisplay: string = "";
  public section?: Section;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookmarkService: BookmarkService) {
  }

  public ngOnInit(): void {
    this.bookmarkService.sections
      .subscribe(_ => this.fetchSectionToDisplay());

    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params.section) {
        this.sectionUuidToDisplay = params.section;
      }
      this.fetchSectionToDisplay();
    }));
  }

  private fetchSectionToDisplay(): void {
    if (this.sectionUuidToDisplay) {
      this.bookmarkService.getSection(this.sectionUuidToDisplay)
        .pipe(first())
        .subscribe(value => {
          if (value) {
            this.section = value;
          } else {
            this.router.navigate(['/']);
          }
        });
    } else {
      const firstSection = this.bookmarkService.getSectionAtIndex(0);
      if (firstSection) {
        this.router.navigate([`/${firstSection.uuid}`]);
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
