export interface Section {
  id?: string,
  title: string,
  groups: Group[];
}

export interface Group {
  id?: string,
  title: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
  id?: string,
  title: string;
  link: Link;
}

export interface Link {
  url: string;
  text: string;
  faviconUrl?: string;
}
