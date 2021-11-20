export interface Bookmark {
    title: string;
    links: Link[];
}

export interface Link {
    url: string;
    text: string;
    faviconUrl?: string;
}
