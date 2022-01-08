import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {first, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Section} from '../../../../models/dto/bookmark.model';
import {PostSectionRequest} from '../models/post-section.request';
import {PutSectionRequest} from '../models/put-section.request';
import {UrlService} from './url.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  public sections = new BehaviorSubject<Section[]>([]);

  constructor(private httpClient: HttpClient,
              private urlService: UrlService) {
    this.loadBookMarks();
  }

  private loadBookMarks(): void {
    this.httpClient.get<Section[]>(this.urlService.getGetSectionsUrl()).pipe(first())
      .subscribe(value => this.sections.next(value));
  }

  public getSection(uuid: string): Observable<Section | undefined> {
    return this.sections.pipe(
      first(),
      map((value: Section[]): Section | undefined => {
        return value.find(sections => sections.uuid === uuid);
      }));
  }

  public getSectionAtIndex(index: number): Section | undefined {
    if (this.sections.getValue().length >= index) {
      return this.sections.getValue()[index];
    } else {
      return undefined;
    }
  }

  public createSection(title: string): Observable<Section> {
    const body: PostSectionRequest = {
      title
    };

    return this.httpClient.post<Section>(this.urlService.getPostSectionsUrl(), body)
      .pipe(
        first(),
        tap(value => {
          this.sections.next([...this.sections.getValue(), value]);
        }));
  }

  public updateSection(sectionUuid: string, newTitle: string): Observable<Section> {
    const body: PutSectionRequest = {
      title: newTitle
    };

    return this.httpClient.put<Section>(this.urlService.getPutSectionsUrl(sectionUuid), body)
      .pipe(
        first(),
        tap(sectionFromBackend => {
          this.sections.next([...this.sections.value.filter(section => section.uuid !== sectionUuid), sectionFromBackend]);
        })
      );
  }

  public deleteSection(sectionUuid: string): Observable<void> {

    return this.httpClient.delete<void>(this.urlService.getDeleteSectionsUrl(sectionUuid))
      .pipe(
        first(),
        tap(_ => {
          this.sections.next([...this.sections.value.filter(section => section.uuid !== sectionUuid)]);
        })
      );
  }

}
