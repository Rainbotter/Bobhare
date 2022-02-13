import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {

  public getGetAuthUrl(): string {
    return 'api/auth';
  }

  public getGetSectionsUrl(): string {
    return 'api/sections';
  }

  public getPostSectionsUrl(): string {
    return 'api/sections';
  }

  public getPutSectionsUrl(sectionUuid: string): string {
    return `api/sections/${sectionUuid}`;
  }

  public getDeleteSectionsUrl(sectionUuid: string): string {
    return `api/sections/${sectionUuid}`;
  }

  public getPostGroupUrl(sectionUuid: string): string {
    return `api/sections/${sectionUuid}/groups`;
  }

  public getPutGroupUrl(sectionUuid: string, groupUuid: string): string {
    return `api/sections/${sectionUuid}/groups/${groupUuid}`;
  }

  public getDeleteGroupUrl(sectionUuid: string, groupUuid: string): string {
    return `api/sections/${sectionUuid}/groups/${groupUuid}`;
  }

}
