import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {autoInjectable} from "tsyringe";
import {Controller} from "./controller";
import {Request, Response} from "express";
import {Section} from "../models/dto/bookmark.model";
import {BookmarkService} from "../services/bookmark.service";
import {PostSectionValidator} from "../models/validators/post-section.validator";
import {toSectionResponse} from "../helpers/section.mapper";
import {SectionDao} from "../models/dao/section.dao";
import {PostSectionRequest} from "../models/dto/post-section.request";

@autoInjectable()
export class BookmarkController extends Controller {

  private logger: Logger = LoggerConfig.getLogger("WebController");

  constructor(private bookmarkService: BookmarkService,
              private postSectionValidator: PostSectionValidator) {
    super();
  }

  public async getSections(req: Request, res: Response): Promise<void> {
    const sections: SectionDao[] = await this.bookmarkService.getSections();
    this.responseHelper.ok<Section[]>(req, res, sections.map(section => toSectionResponse(section)));
  }

  public async postSection(req: Request, res: Response): Promise<void> {
    const request: PostSectionRequest = await this.postSectionValidator.validate(req);
    const section: SectionDao = await this.bookmarkService.createSection(request.title);
    this.responseHelper.ok<Section>(req, res, toSectionResponse(section));
  }

}
