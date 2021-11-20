export interface Group {
  title: string;
  bookmarks: Bookmark[];
}

export interface Bookmark {
    title: string;
    link: Link;
}

export interface Link {
    url: string;
    text: string;
    faviconUrl?: string;
}
