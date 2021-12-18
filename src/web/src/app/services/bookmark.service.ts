import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {first} from 'rxjs/operators';
import {StringService} from './string.service';
import {HttpClient} from '@angular/common/http';
import {Section} from "../models/bookmark.model";

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
        uuid: "0",
        title: 'Section 0',
        groups: [
          {
            uuid: "10",
            title: 'Group 10',
            color: '#000000',
            bookmarks: [
              {
                uuid: "100",
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                url: 'https://www.youtube.com'
              },
              {
                uuid: "101",
                title: 'Bookmark sqdf',
                url: 'https://www.youtube.com'
              }
            ]
          },
          {
            uuid: "11",
            title: 'Group 11',
            color: '#444444',
            bookmarks: [
              {
                uuid: "110",
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                url: 'https://www.youtube.com'
              },
              {
                uuid: "111",
                title: 'Bookmark sqdf',
                url: 'https://www.youtube.com'
              }
            ]
          },
          {
            uuid: "12",
            title: 'Group 12',
            color: '#AAAAAA',
            bookmarks: [
              {
                uuid: "120",
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                url: 'https://www.youtube.com'
              },
              {
                uuid: "121",
                title: 'Bookmark sqdf',
                url: 'https://www.youtube.com'
              }
            ]
          },
          {
            uuid: "13",
            title: 'Group 13',
            color: '#F4A302',
            bookmarks: [
              {
                uuid: "130",
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                url: 'https://www.youtube.com'
              },
              {
                uuid: "131",
                title: 'Bookmark sqdf',
                url: 'https://www.youtube.com'
              }
            ]
          },
          {
            uuid: "14",
            title: 'Group 14',
            color: '#FFFFFF',
            bookmarks: [
              {
                uuid: "140",
                title: 'Bookmark 1q sdfqsd ffds sdfq s dqf sfdqsdf sdfq sfdqs dqfsqdfqsfdsfd ',
                url: 'https://www.youtube.com'
              },
              {
                uuid: "141",
                title: 'Bookmark sqdf',
                url: 'https://www.youtube.com'
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
