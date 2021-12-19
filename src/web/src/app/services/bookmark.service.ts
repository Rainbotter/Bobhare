import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {StringService} from './string.service';
import {HttpClient} from '@angular/common/http';
import {Section} from "../../../../models/dto/bookmark.model";
import {environment} from "../../environments/environment";
import {PostSectionRequest} from "../../../../models/dto/post-section.request";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  public sections = new BehaviorSubject<Section[]>([]);

  constructor(private stringService: StringService, private httpClient: HttpClient) {
    this.loadBookMarks();
  }

  private loadBookMarks(): void {
    this.httpClient.get<Section[]>(environment.urls.getSections).pipe(first())
      .subscribe(value => this.sections.next(value));
  }

  public getSection(slugifiedTitle: string): Observable<Section | undefined> {
    return this.sections.pipe(
      first(),
      map((value: Section[]): Section | undefined => {
        return value.find(sections => this.stringService.slugify(sections.title) === slugifiedTitle);
      }));
  }

  public getSectionAtIndex(index: number): Section | undefined {
    if (this.sections.getValue().length >= index) {
      return this.sections.getValue()[index];
    } else {
      return undefined;
    }
  }

  public createSection(section: Section): Observable<Section> {
    const body: PostSectionRequest = {
      title: section.title
    };

    return this.httpClient.post<Section>(environment.urls.postSection, body)
      .pipe(
        first(),
        tap(value => {
          this.sections.next([...this.sections.getValue(), value]);
        }));
  }

  public updateSection(section: Section): Observable<Section> {
    return of(section);
  }

}
