import { Group } from '../models/dto/bookmark.model';
import { GroupDao } from '../models/dao/group.dao';
import {toLinkResponse} from "./link.mapper";

export function toGroupResponse(group: GroupDao): Group {
  return {
    uuid: group.uuid,
    title: group.title,
    color: group.color,
    links: group.links ? group.links.map(link => toLinkResponse(link)) : [],
  };
}
