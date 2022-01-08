import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionService} from '../../services/section.service';
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
              private sectionService: SectionService) {
  }

  public ngOnInit(): void {
    this.sectionService.sections
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
      this.sectionService.getSection(this.sectionUuidToDisplay)
        .pipe(first())
        .subscribe(value => {
          if (value) {
            this.section = value;
          } else {
            this.router.navigate(['/']);
          }
        });
    } else {
      const firstSection = this.sectionService.getSectionAtIndex(0);
      if (firstSection) {
        this.router.navigate([`/sections/${firstSection.uuid}`]);
      }
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
