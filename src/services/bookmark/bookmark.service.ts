import { Injectable, NotFoundException } from '@nestjs/common';
import { SectionDao } from '../../models/dao/section.dao';
import { getRepository } from 'typeorm';
import { nanoid } from 'nanoid';
import { GroupDao } from '../../models/dao/group.dao';

@Injectable()
export class BookmarkService {
  public async getSections(): Promise<SectionDao[]> {
    return getRepository(SectionDao).find();
  }

  public async getSectionByUuid(sectionUuid: string): Promise<SectionDao> {
    return getRepository(SectionDao)
      .findOneOrFail({ where: { uuid: sectionUuid } })
      .catch((reason) => {
        throw new NotFoundException(reason);
      });
  }

  public async createSection(title: string): Promise<SectionDao> {
    const newSection: SectionDao = new SectionDao();
    newSection.title = title;
    newSection.uuid = nanoid(7);
    newSection.groups = [];
    return getRepository(SectionDao).save(newSection);
  }

  public async updateSection(
    sectionUuid: string,
    title: string,
  ): Promise<SectionDao> {
    const section = await getRepository(SectionDao).findOne({
      where: { uuid: sectionUuid },
    });
    if (!section) {
      throw new NotFoundException(
        `Section with uuid ${sectionUuid} doesn't exist`,
      );
    }

    section.title = title;
    return getRepository(SectionDao).save(section);
  }

  public async deleteSection(sectionUuid: string): Promise<void> {
    const result = await getRepository(SectionDao).delete({
      uuid: sectionUuid,
    });
    if (result.affected === 0) {
      throw new NotFoundException(
        `Section with uuid ${sectionUuid} doesn't exist`,
      );
    }
  }

  public async createGroup(
    sectionUuid: string,
    title: string,
    color: string,
  ): Promise<GroupDao> {
    const section: SectionDao = await this.getSectionByUuid(sectionUuid);

    const newGroup: GroupDao = new GroupDao();
    newGroup.title = title;
    newGroup.uuid = nanoid(7);
    newGroup.color = color;
    newGroup.bookmarks = [];
    newGroup.section = section;
    return getRepository(GroupDao).save(newGroup);
  }

  public async updateGroup(
    groupUuid: string,
    title: string,
    color: string,
  ): Promise<GroupDao> {
    const group = await getRepository(GroupDao).findOne({
      where: { uuid: groupUuid },
    });
    if (!group) {
      throw new NotFoundException(`Group with uuid ${groupUuid} doesn't exist`);
    }

    group.title = title;
    group.color = color;
    return getRepository(GroupDao).save(group);
  }

  public async deleteGroup(groupUuid: string): Promise<void> {
    const result = await getRepository(GroupDao).delete({ uuid: groupUuid });
    if (result.affected === 0) {
      throw new NotFoundException(`Group with uuid ${groupUuid} doesn't exist`);
    }
  }
}
