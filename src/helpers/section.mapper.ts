import { SectionDao } from '../models/dao/section.dao';
import { Section } from '../models/dto/bookmark.model';
import {toGroupResponse} from "./group.mapper";

export function toSectionResponse(section: SectionDao): Section {
  return {
    uuid: section.uuid,
    title: section.title,
    groups: section.groups ? section.groups.map(group => toGroupResponse(group)) : [],
  };
}
