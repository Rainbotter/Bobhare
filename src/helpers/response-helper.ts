import {Request, Response} from "express";
import {Logger} from "winston";
import {singleton} from "tsyringe";
import {LoggerConfig} from "../config/logger.config";
import {ErrorResponse} from "../models/dto/error.responses";
import {SETTINGS} from "../config/settings.config";

@singleton()
export class ResponseHelper {

  private _logger: Logger = LoggerConfig.getLogger("Application");

  public sendFile(req: Request, res: Response, path: string): void {
    res.sendFile('/', {
      root: path
    });

    this._logger.info(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode}`);
  }

  public ok(req: Request, res: Response, value?: unknown): void {
    value = value || {};
    res.status(200);
    res.json(value);
    this._logger.info(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode}`);
  }

  public created(req: Request, res: Response, value?: unknown): void {
    value = value || {};
    res.status(201);
    res.json(value);
    this._logger.info(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode}`);
  }

  public badRequest(req: Request, res: Response, error?: Error): void {

    const result: ErrorResponse = {
      error: error ? error.message : ""
    };

    res.status(400);
    res.json(result);
    this._logger.info(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode} ${error}`);
  }

  public unauthorized(req: Request, res: Response, error?: Error): void {

    const result: ErrorResponse = {
      error: error ? error.message : ""
    };

    res.status(401);
    res.json(result);
    this._logger.warn(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode} ${error}`);
  }

  public forbidden(req: Request, res: Response, error?: Error): void {

    const result: ErrorResponse = {
      error: error ? error.message : ""
    };

    res.status(403);
    res.json(result);
    this._logger.warn(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode} ${error}`);
  }

  public notFound(req: Request, res: Response, error?: Error): void {

    const result: ErrorResponse = {
      error: error ? error.message : ""
    };

    res.status(404);
    res.json(result);
    this._logger.info(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode} ${error}`);
  }

  public internalError(req: Request, res: Response, error?: Error): void {

    const result: ErrorResponse = {
      error: "Internal error"
    };

    res.status(500);
    res.json(result);
    this._logger.error(`↑ ${req.method} ${req.originalUrl} → ${res.statusCode} ${error}`);
  }

}
