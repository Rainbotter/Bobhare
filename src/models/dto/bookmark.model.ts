export interface Section {
  uuid?: string;
  title: string;
  groups: Group[];
}

export interface Group {
  uuid?: string;
  title: string;
  color: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  uuid?: string;
  title: string;
  url: string;
  faviconUrl?: string;
}
