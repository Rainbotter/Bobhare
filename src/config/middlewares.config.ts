import {ErrorRequestHandler, RequestHandler} from "express";
import {Logger} from "winston";
import {singleton} from "tsyringe";
import {LoggerConfig} from "./logger.config";
import {Errors} from "../models/enums/errors.enum";
import {ResponseHelper} from "../helpers/response-helper";
import {AuthService} from "../services/auth.service";
import {SETTINGS} from "./settings.config";

@singleton()
export class Middlewares {

  private logger: Logger = LoggerConfig.getLogger("Application");

  constructor(private responsesHelper: ResponseHelper,
              private authService: AuthService) {
  }

  /**
   * This should be the last "app.use" in order to work properly
   */
  public handleUnknownRoutes(): RequestHandler {
    return (req, res) => {
      this.responsesHelper.badRequest(req, res, new Error(`The route ${req.originalUrl} doesn't exist`));
    };
  }

  public handleUncaughtExceptions(): ErrorRequestHandler {
    return (error, req, res, _) => {
      if (error && error.name) {
        switch (error.name) {
          case Errors.NOT_FOUND:
            this.responsesHelper.notFound(req, res, error);
            break;
          case Errors.FORBIDDEN:
            this.responsesHelper.forbidden(req, res, error);
            break;
          case Errors.INVALID_VALUE:
          case Errors.REQUEST_VALIDATION_ERROR:
            this.responsesHelper.badRequest(req, res, error);
            break;
          default:
            this.logger.error(error.stack);
            this.responsesHelper.internalError(req, res, error);
        }
      } else {
        if (!error) {
          error = new Error("Unknown event");
        }
        this.logger.error(error.stack);
        this.responsesHelper.internalError(req, res, error);
      }
    };
  }

  public assertUserIsAuthenticated(): RequestHandler {
    return (req, res, next) => {
      if (this.authService.auth(req.header(SETTINGS.APPLICATION.AUTH.HEADER) || "")) {
        next();
      } else {
        this.responsesHelper.forbidden(req, res, new Error("Authentication failed"));
      }
    };
  }

  public logIncomingRequest(): RequestHandler {
    return (req, res, next) => {
      this.logger.info(`↓ ${req.method} ${req.originalUrl}`);
      next();
    };
  }

}
