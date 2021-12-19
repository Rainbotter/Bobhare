import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookmarkService} from '../../services/bookmark.service';
import {Subscription} from 'rxjs';
import {StringService} from "../../services/string.service";
import {Section} from "../../../../../models/dto/bookmark.model";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private sectionTitleToDisplay: string = "";
  public section?: Section;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookmarkService: BookmarkService,
              private stringService: StringService) {
  }

  public ngOnInit(): void {
    this.bookmarkService.sections
      .subscribe(_ => this.fetchSectionToDisplay());

    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params.section) {
        this.sectionTitleToDisplay = params.section;
      }
      this.fetchSectionToDisplay();
    }));
  }

  private fetchSectionToDisplay(): void {
    if (this.sectionTitleToDisplay) {
      this.bookmarkService.getSection(this.sectionTitleToDisplay)
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
        this.router.navigate([`/${this.stringService.slugify(firstSection.title)}`]);
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
