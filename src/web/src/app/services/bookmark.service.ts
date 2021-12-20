import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { StringService } from './string.service';
import { HttpClient } from '@angular/common/http';
import { Section } from '../../../../models/dto/bookmark.model';
import { PostSectionRequest } from '../models/post-section.request';
import { PutSectionRequest } from '../models/put-section.request';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  public sections = new BehaviorSubject<Section[]>([]);

  constructor (private stringService: StringService, private httpClient: HttpClient, private urlService: UrlService) {
    this.loadBookMarks();
  }

  private loadBookMarks (): void {
    this.httpClient.get<Section[]>(this.urlService.getGetSectionsUrls()).pipe(first())
      .subscribe(value => this.sections.next(value));
  }

  public getSection (slugifiedTitle: string): Observable<Section | undefined> {
    return this.sections.pipe(
      first(),
      map((value: Section[]): Section | undefined => {
        return value.find(sections => this.stringService.slugify(sections.title) === slugifiedTitle);
      }));
  }

  public getSectionAtIndex (index: number): Section | undefined {
    if (this.sections.getValue().length >= index) {
      return this.sections.getValue()[index];
    } else {
      return undefined;
    }
  }

  public createSection (title: string): Observable<Section> {
    const body: PostSectionRequest = {
      title: title
    };

    return this.httpClient.post<Section>(this.urlService.getPostSectionsUrls(), body)
      .pipe(
        first(),
        tap(value => {
          this.sections.next([...this.sections.getValue(), value]);
        }));
  }

  public updateSection (sectionUuid: string, newTitle: string): Observable<Section> {
    const body: PutSectionRequest = {
      title: newTitle
    };

    return this.httpClient.put<Section>(this.urlService.getPutSectionsUrls(sectionUuid), body)
      .pipe(
        first(),
        tap(sectionFromBackend => {
          this.sections.next([...this.sections.value.filter(section => section.uuid != sectionUuid), sectionFromBackend]);
        })
      );
  }

}
