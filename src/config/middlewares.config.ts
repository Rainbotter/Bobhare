import {ErrorRequestHandler, RequestHandler} from "express";
import {Logger} from "winston";
import {singleton} from "tsyringe";
import {LoggerConfig} from "./logger.config";
import {Errors} from "../models/enums/errors.enum";
import {ResponseHelper} from "../helpers/response-helper";

@singleton()
export class Middlewares {

  private logger: Logger = LoggerConfig.getLogger("Application");

  constructor(private responsesHelper: ResponseHelper) {
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
      this.logger.error(error.stack);
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
            this.responsesHelper.internalError(req, res, error);
        }
      } else {
        if (!error) {
          error = new Error("Unknown event");
        }
        this.responsesHelper.internalError(req, res, error);
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
