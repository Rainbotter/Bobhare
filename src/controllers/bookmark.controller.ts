import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {autoInjectable} from "tsyringe";
import {Controller} from "./controller";
import {Request, Response} from "express";
import {Group, Section} from "../models/dto/bookmark.model";
import {BookmarkService} from "../services/bookmark.service";
import {PostSectionRequest, PostSectionValidator} from '../models/validators/post-section.validator';
import {toSectionResponse} from "../helpers/section.mapper";
import {SectionDao} from "../models/dao/section.dao";
import {PutSectionRequest, PutSectionValidator} from '../models/validators/put-section.validator';
import {DeleteSectionRequest, DeleteSectionValidator} from "../models/validators/delete-section.validator";
import {PostGroupRequest, PostGroupValidator} from "../models/validators/post-group.validator";
import {GroupDao} from "../models/dao/group.dao";
import {toGroupResponse} from "../helpers/group.mapper";

@autoInjectable()
export class BookmarkController extends Controller {

  private logger: Logger = LoggerConfig.getLogger("WebController");

  constructor(private bookmarkService: BookmarkService,
              private postSectionValidator: PostSectionValidator,
              private putSectionValidator: PutSectionValidator,
              private deleteSectionValidator: DeleteSectionValidator,
              private postGroupValidator: PostGroupValidator) {
    super();
  }

  public async getSections(req: Request, res: Response): Promise<void> {
    const sections: SectionDao[] = await this.bookmarkService.getSections();
    this.responseHelper.ok<Section[]>(req, res, sections.map(section => toSectionResponse(section)));
  }

  public async postSection(req: Request, res: Response): Promise<void> {
    const requestContent: PostSectionRequest = await this.postSectionValidator.validate(req);
    const section: SectionDao = await this.bookmarkService.createSection(requestContent.title);
    this.responseHelper.created<Section>(req, res, toSectionResponse(section));
  }

  public async putSection(req: Request, res: Response): Promise<void> {
    const requestContent: PutSectionRequest = await this.putSectionValidator.validate(req);
    const section: SectionDao = await this.bookmarkService.updateSection(requestContent.uuid, requestContent.title);
    this.responseHelper.created<Section>(req, res, toSectionResponse(section));
  }

  public async deleteSection(req: Request, res: Response): Promise<void> {
    const requestContent: DeleteSectionRequest = await this.deleteSectionValidator.validate(req);
    await this.bookmarkService.deleteSection(requestContent.uuid);
    this.responseHelper.ok<void>(req, res, undefined);
  }

  public async postGroup(req: Request, res: Response): Promise<void> {
    const requestContent: PostGroupRequest = await this.postGroupValidator.validate(req);
    const group: GroupDao = await this.bookmarkService.createGroup(requestContent.sectionUuid, requestContent.title, requestContent.color);
    this.responseHelper.created<Group>(req, res, toGroupResponse(group));
  }

}
