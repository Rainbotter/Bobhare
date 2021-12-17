import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Section} from '../models/bookmark.model';
import {first} from 'rxjs/operators';
import {StringService} from './string.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  public bookmarks = new BehaviorSubject<Section[]>([]);

  constructor(private stringService: StringService, private httpClient: HttpClient) {
    this.loadBookMarks().pipe(first()).subscribe();
  }

  private loadBookMarks(): Observable<Section[]> {
    this.bookmarks.next([
      {
        title: 'Section 1',
        groups: [
          {
            title: 'Group 1',
            color: '#000000',
            bookmarks: [
              {
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              },
              {
                title: 'Bookmark sqdf',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            title: 'Group 1',
            color: '#444444',
            bookmarks: [
              {
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              },
              {
                title: 'Bookmark sqdf',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            title: 'Group 1',
            color: '#AAAAAA',
            bookmarks: [
              {
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              },
              {
                title: 'Bookmark sqdf',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            title: 'Group 1',
            color: '#F4A302',
            bookmarks: [
              {
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              },
              {
                title: 'Bookmark sqdf',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            title: 'Group 1',
            color: '#FFFFFF',
            bookmarks: [
              {
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              },
              {
                title: 'Bookmark sqdf',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
        ]
      }
    ]);

    return this.bookmarks;
  }

  public getSection(slugifiedTitle: string): Section | undefined {
    return this.bookmarks.getValue().find(value => this.stringService.slugify(value.title) === slugifiedTitle);
  }

  public getSectionAtIndex(index: number): Section | undefined {
    if (this.bookmarks.getValue().length >= index) {
      return this.bookmarks.getValue()[index];
    } else {
      return undefined;
    }
  }

  public createSection(section: Section): Observable<Section> {
    this.bookmarks.next([...this.bookmarks.getValue(), section]);
    return of(section);
  }

  public updateSection(section: Section): Observable<Section> {
    return of(section);
  }

}
