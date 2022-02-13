import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { SectionService } from '../../services/section.service';
import { Subscription } from 'rxjs';
import { SectionFormComponent } from '../section-form/section-form.component';
import { Section } from '../../../../../models/dto/bookmark.model';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'bh-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {

  @Input() public bookmarks: Section[] = [];

  @ViewChild('sectionForm') sectionForm?: SectionFormComponent;
  @ViewChild('authForm') authForm?: AuthFormComponent;

  private subscriptions: Subscription[] = [];

  constructor(private sectionService: SectionService) {
    this.subscriptions.push(this.sectionService.sections.subscribe(value => this.bookmarks = value));
  }

  public ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  public openNewSectionForm(): void {
    this.sectionForm?.open();
  }

  public openAuthForm(): void {
    this.authForm?.open();
  }

}
