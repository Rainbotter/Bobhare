import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Group, Link, Section} from '../../../../models/dto/bookmark.model';
import {first, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UrlService} from './url.service';
import {PostLinkRequest} from "../models/post-link.request";
import {PutLinkRequest} from "../models/put-link.request";

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  constructor(private httpClient: HttpClient, private urlService: UrlService) {
  }

  public createLink(
    section: Section,
    group: Group,
    title: string,
    url: string,
    faviconUrl: string,
  ): Observable<Link> {
    if (!section.uuid) {
      throw new Error('section uuid is empty');
    }

    if (!group.uuid) {
      throw new Error('group uuid is empty');
    }

    const body: PostLinkRequest = {
      title,
      url,
      faviconUrl
    };

    return this.httpClient
      .post<Link>(this.urlService.getPostLinkUrl(section.uuid, group.uuid), body)
      .pipe(
        first(),
        tap((value) => {
          group.links = [...group.links, value];
        }),
      );
  }

  public updateLink(
    section: Section,
    group: Group,
    linkUuid: string,
    title: string,
    url: string,
    faviconUrl: string,
  ): Observable<Link> {
    if (!section.uuid) {
      throw new Error('section uuid is empty');
    }

    if (!group.uuid) {
      throw new Error('group uuid is empty');
    }

    const body: PutLinkRequest = {
      title,
      url,
      faviconUrl
    };

    return this.httpClient
      .put<Link>(this.urlService.getPutLinkUrl(section.uuid, group.uuid, linkUuid), body)
      .pipe(
        first(),
        tap((linkFromBackend) => {
          group.links = [
            ...group.links.filter((link) => link.uuid !== linkUuid),
            linkFromBackend,
          ];
        }),
      );
  }

  public deleteLink(
    section: Section,
    group: Group,
    linkUuid: string,): Observable<void> {
    if (!section.uuid) {
      throw new Error('section uuid is empty');
    }

    if (!group.uuid) {
      throw new Error('group uuid is empty');
    }

    return this.httpClient
      .delete<void>(this.urlService.getDeleteLinkUrl(section.uuid, group.uuid, linkUuid))
      .pipe(
        first(),
        tap((_) => {
          group.links = [
            ...group.links.filter((link) => link.uuid !== linkUuid),
          ];
        }),
      );
  }
}
