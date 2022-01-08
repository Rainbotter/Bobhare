import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Group, Section} from "../../../../models/dto/bookmark.model";
import {first, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {PostGroupRequest} from "../models/post-group.request";
import {PutGroupRequest} from "../models/put-group.request";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient,
              private urlService: UrlService) {
  }

  public createGroup(section: Section, title: string, color: string): Observable<Group> {
    if (!section.uuid) {
      throw new Error("section uuid is empty");
    }

    const body: PostGroupRequest = {
      title, color
    };

    return this.httpClient.post<Group>(this.urlService.getPostGroupUrl(section.uuid), body)
      .pipe(
        first(),
        tap(value => {
          section.groups = [...section.groups, value];
        }));
  }

  public updateGroup(section: Section, groupUuid: string, title: string, color: string): Observable<Group> {
    if (!section.uuid) {
      throw new Error("section uuid is empty");
    }

    const body: PutGroupRequest = {
      title, color
    };

    return this.httpClient.put<Group>(this.urlService.getPutGroupUrl(section.uuid, groupUuid), body)
      .pipe(
        first(),
        tap(groupromBackend => {
          section.groups = [...section.groups.filter(group => group.uuid !== groupUuid), groupromBackend];
        })
      );
  }

  public deleteGroup(section: Section, groupUuid: string): Observable<void> {
    if (!section.uuid) {
      throw new Error("section uuid is empty");
    }

    return this.httpClient.delete<void>(this.urlService.getDeleteGroupUrl(section.uuid, groupUuid))
      .pipe(
        first(),
        tap(_ => {
          section.groups = [...section.groups.filter(group => group.uuid !== groupUuid)];
        })
      );
  }
}
