import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { Section } from '../models/bookmark.model'
import { first } from 'rxjs/operators'
import { StringService } from './string.service'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  public bookmarks = new BehaviorSubject<Section[]>([])

  constructor (private stringService: StringService, private httpClient: HttpClient) {
    this.loadBookMarks().pipe(first()).subscribe()
  }

  public loadBookMarks (): Observable<Section[]> {
    this.bookmarks.next([
      {
        title: 'Section 1',
        groups: [{
          'title': 'Group 1',
          bookmarks: [
            {
              'title': 'Bookmark 1',
              link: {
                'text': 'oui',
                'url': 'https://www.youtube.com'
              }
            }
          ]
        },
          {
            'title': 'Group 1',
            bookmarks: [
              {
                'title': 'Bookmark 1',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            'title': 'Group 1',
            bookmarks: [
              {
                'title': 'Bookmark 1',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          },
          {
            'title': 'Group 1',
            bookmarks: [
              {
                'title': 'Bookmark 1',
                link: {
                  'text': 'oui',
                  'url': 'https://www.youtube.com'
                }
              }
            ]
          }]
      }
    ])

    return this.bookmarks
  }

  public getSection (slugifiedTitle: string): Section | undefined {
    return this.bookmarks.getValue().find(value => this.stringService.slugify(value.title) === slugifiedTitle)
  }

  public getSectionAtIndex (index: number): Section | undefined {
    if (this.bookmarks.getValue().length >= index) {
      return this.bookmarks.getValue()[index]
    } else {
      return undefined
    }
  }

  public addNewSection (section: Section): Observable<Section> {
    this.bookmarks.next([...this.bookmarks.getValue(), section])
    return of(section)
  }

}
