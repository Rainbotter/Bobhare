import {singleton} from "tsyringe";
import express, {Application} from "express";
import {Logger} from "winston";
import {LoggerConfig} from "./logger.config";
import {Middlewares} from "./middlewares.config";
import {WebController} from "../controllers/web.controller";
import {SETTINGS} from "./settings.config";
import {BookmarkController} from "../controllers/bookmark.controller";

@singleton()
export class Routes {

  private logger: Logger = LoggerConfig.getLogger("Routes");

  private prefix: string = SETTINGS.APPLICATION.BACKEND_URL_PREFIX;

  constructor(private middlewares: Middlewares,
              private webController: WebController,
              private bookmarkController: BookmarkController) {
  }

  public setupRoutes(app: Application): void {
    this.setupApiRoutes(app);
    this.setupWebAppRoutes(app);
  }

  private setupWebAppRoutes(app: Application): void {
    app.get('*.*', express.static(SETTINGS.APPLICATION.WEB_APP_PATH, {maxAge: '1y'}));
    app.get('/*', this.middlewares.logIncomingRequest(), (req, res, next) => this.webController.serveWebApp(req, res).catch(reason => next(reason)));
  }

  private setupApiRoutes(app: Application): void {
    app.get(`${this.prefix}/sections`, this.middlewares.logIncomingRequest(), (req, res, next) => this.bookmarkController.getSections(req, res).catch(reason => next(reason)));
    app.post(`${this.prefix}/sections`, this.middlewares.logIncomingRequest(), (req, res, next) => this.bookmarkController.postSection(req, res).catch(reason => next(reason)));
    app.put(`${this.prefix}/sections/:uuid`, this.middlewares.logIncomingRequest(), (req, res, next) => this.bookmarkController.putSection(req, res).catch(reason => next(reason)));
  }

}
