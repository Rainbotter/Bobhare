import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {autoInjectable} from "tsyringe";
import {Controller} from "./controller";
import {Request, Response} from "express";

@autoInjectable()
export class BookmarkController extends Controller {

  private logger: Logger = LoggerConfig.getLogger("WebController");

  public async getSections(req: Request, res: Response): Promise<void> {
    this.responseHelper.ok<string>(req, res, "ok");
  }

}
