import {LoggerConfig} from '../config/logger.config';
import {Logger} from 'winston';
import {injectable} from 'tsyringe';
import {SectionDao} from '../models/dao/section.dao';
import {getRepository} from 'typeorm';
import {nanoid} from 'nanoid';
import {NotFoundError} from '../models/errors/not-found.error';
import {GroupDao} from "../models/dao/group.dao";

@injectable()
export class BookmarkService {

  private logger: Logger = LoggerConfig.getLogger('BookmarkService');

  public async getSections(): Promise<SectionDao[]> {
    return getRepository(SectionDao).find();
  }

  public async getSectionByUuid(sectionUuid: string): Promise<SectionDao> {
    return getRepository(SectionDao).findOneOrFail({where: {uuid: sectionUuid}})
      .catch(reason => {
        throw new NotFoundError(reason);
      });
  }

  public async createSection(title: string): Promise<SectionDao> {
    const newSection: SectionDao = new SectionDao();
    newSection.title = title;
    newSection.uuid = nanoid(7);
    newSection.groups = [];
    return getRepository(SectionDao).save(newSection);
  }

  public async updateSection(uuid: string, title: string): Promise<SectionDao> {
    const section = await getRepository(SectionDao).findOne({where: {uuid}});
    if (!section) {
      throw new NotFoundError(`Section with uuid ${uuid} doesn't exist`);
    }

    section.title = title;
    return getRepository(SectionDao).save(section);
  }

  public async deleteSection(uuid: string): Promise<void> {
    const result = await getRepository(SectionDao).delete({uuid});
    if (result.affected === 0) {
      throw new NotFoundError(`Section with uuid ${uuid} doesn't exist`);
    }
  }

  public async createGroup(sectionUuid: string, title: string, color: string): Promise<GroupDao> {
    const section: SectionDao = await this.getSectionByUuid(sectionUuid);

    const newGroup: GroupDao = new GroupDao();
    newGroup.title = title;
    newGroup.uuid = nanoid(7);
    newGroup.color = color;
    newGroup.bookmarks = [];
    newGroup.section = section;
    return getRepository(GroupDao).save(newGroup);
  }

}
