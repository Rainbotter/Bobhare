import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookmarkService} from '../../services/bookmark.service';
import {Subscription} from 'rxjs';
import {StringService} from "../../services/string.service";
import {Section} from "../../models/bookmark.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public section?: Section;

  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private bookmarkService: BookmarkService,
              private stringService: StringService) {
  }

  public ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params.section) {
        this.section = this.bookmarkService.getSection(params.section);
      } else {
        const firstSection = this.bookmarkService.getSectionAtIndex(0);
        if (firstSection) {
          this.router.navigate([`/${this.stringService.slugify(firstSection.title)}`]);
        }
      }
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
