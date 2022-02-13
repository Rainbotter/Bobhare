import { SectionDao } from '../models/dao/section.dao';
import { Section } from '../models/dto/bookmark.model';

export function toSectionResponse(section: SectionDao): Section {
  return {
    uuid: section.uuid,
    title: section.title,
    groups: section.groups,
  };
}
