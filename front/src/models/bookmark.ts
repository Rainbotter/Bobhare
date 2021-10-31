export interface Link {
  url: string
  title: string
  favicon?: string
}

export class Bookmark {
  title?: string
  links?: Array<Link>

  constructor ({
    title,
    links
  }: {
    title?: string
    links?: Array<Link>
  }) {
    this.title = title
    this.links = links
  }
}
