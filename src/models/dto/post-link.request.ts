import {GroupsParams} from './params.request';
import {Link} from "./bookmark.model";

export class PostLinkParams extends GroupsParams {
}

export class PostLinkBody {
  title: string;
  url: string;
  faviconUrl: string;
}

export class PostLinkQuery {
}

export class PostLinkResponse extends Link {
}
