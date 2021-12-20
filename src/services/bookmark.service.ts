import { LoggerConfig } from '../config/logger.config';
import { Logger } from 'winston';
import { injectable } from 'tsyringe';
import { SectionDao } from '../models/dao/section.dao';
import { getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../models/errors/not-found.error';

@injectable()
export class BookmarkService {

  private logger: Logger = LoggerConfig.getLogger('BookmarkService');

  public async getSections (): Promise<SectionDao[]> {
    return getRepository(SectionDao).find();
  }

  public async createSection (title: string): Promise<SectionDao> {
    const newSection: SectionDao = new SectionDao();
    newSection.title = title;
    newSection.uuid = uuidv4();
    newSection.groups = [];
    return getRepository(SectionDao).save(newSection);
  }

  public async updateSection (uuid: string, title: string): Promise<SectionDao> {
    const section = await getRepository(SectionDao).findOne({ where: { uuid } });
    if (!section) {
      throw new NotFoundError(`Section with uuid ${uuid} doesn't exist`);
    }

    section.title = title;
    return getRepository(SectionDao).save(section);
  }

}
