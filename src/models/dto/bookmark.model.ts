export class Section {
  uuid?: string = '';
  title: string = '';
  groups: Group[] = [];
}

export class Group {
  uuid?: string = '';
  title: string = '';
  color: string = '';
  links: Link[] = [];
}

export class Link {
  uuid?: string = '';
  title: string = '';
  url: string = '';
  faviconUrl?: string = '';
}
