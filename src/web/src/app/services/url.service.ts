import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() {
  }

  public getGetSectionsUrls(): string {
    return 'api/sections';
  }

  public getPostSectionsUrls(): string {
    return 'api/sections';
  }

  public getPutSectionsUrls(sectionUuid: string): string {
    return `api/sections/${sectionUuid}`;
  }

}
