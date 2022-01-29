import {autoInjectable} from "tsyringe";
import {Controller} from "./controller";
import {Logger} from "winston";
import {LoggerConfig} from "../config/logger.config";
import {AuthService} from "../services/auth.service";
import {Request, Response} from "express";
import {PostAuthRequest, PostAuthValidator} from "../models/validators/post-auth.validator";

@autoInjectable()
export class AuthController extends Controller {

  private logger: Logger = LoggerConfig.getLogger("AuthController");

  constructor(private authService: AuthService,
              private postAuthValidator: PostAuthValidator) {
    super();
  }

  public async postAuthentication(req: Request, res: Response): Promise<void> {
    const requestContent: PostAuthRequest = await this.postAuthValidator.validate(req);
    const hasAuthSucceed: boolean = this.authService.auth(requestContent.password);

    if (hasAuthSucceed) {
      this.responseHelper.ok<{}>(req, res, {});
    } else {
      this.responseHelper.badRequest(req, res, new Error("Auth failed"));
    }

  }

}
