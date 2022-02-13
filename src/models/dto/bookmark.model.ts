export class Section {
  uuid?: string = '';
  title: string = '';
  groups: Group[] = [];
}

export class Group {
  uuid?: string = '';
  title: string = '';
  color: string = '';
  bookmarks: Bookmark[] = [];
}

export class Bookmark {
  uuid?: string = '';
  title: string = '';
  url: string = '';
  faviconUrl?: string = '';
}
