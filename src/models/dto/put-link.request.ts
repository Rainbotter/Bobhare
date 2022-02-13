import {LinksParams} from './params.request';
import {Link} from "./bookmark.model";

export class PutLinkParams extends LinksParams {
}

export class PutLinkBody {
  title: string;
  url: string;
  faviconUrl: string;
}

export class PutLinkQuery {
}

export class PutLinkResponse extends Link {
}
