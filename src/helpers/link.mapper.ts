import {Link} from '../models/dto/bookmark.model';
import {LinkDao} from "../models/dao/link.dao";

export function toLinkResponse(link: LinkDao): Link {
  return {
    uuid: link.uuid,
    title: link.title,
    url: link.url,
    faviconUrl: link.faviconUrl
  };
}
