import { Group } from '../models/dto/bookmark.model';
import { GroupDao } from '../models/dao/group.dao';

export function toGroupResponse(group: GroupDao): Group {
  return {
    uuid: group.uuid,
    title: group.title,
    color: group.color,
    bookmarks: group.bookmarks,
  };
}
