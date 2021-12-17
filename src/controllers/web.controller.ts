import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {autoInjectable} from "tsyringe";
import {Controller} from "./controller";
import {Request, Response} from "express";
import {SETTINGS} from "../config/settings.config";

@autoInjectable()
export class WebController extends Controller {

  private logger: Logger = LoggerConfig.getLogger("WebController");

  public async serveWebApp(req: Request, res: Response): Promise<void> {
    this.responseHelper.sendFile(req, res, SETTINGS.APPLICATION.WEB_APP_PATH);
  }

}
