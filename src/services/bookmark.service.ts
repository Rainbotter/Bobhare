import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {injectable} from "tsyringe";
import {SectionDao} from "../models/dao/section.dao";
import {getRepository} from "typeorm";
import {randomUUID} from "crypto";

@injectable()
export class BookmarkService {

  private logger: Logger = LoggerConfig.getLogger("BookmarkService");

  public async getSections(): Promise<SectionDao[]> {
    return getRepository(SectionDao).find();
  }

  public async createSection(title: string): Promise<SectionDao> {
    const newSection: SectionDao = new SectionDao();
    newSection.title = title;
    newSection.uuid = randomUUID();
    newSection.groups = [];
    return getRepository(SectionDao).save(newSection);
  }

}
