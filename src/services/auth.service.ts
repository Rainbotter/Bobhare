import {injectable} from "tsyringe";
import {Logger} from "winston";
import {LoggerConfig} from "../config/logger.config";
import {SETTINGS} from "../config/settings.config";

@injectable()
export class AuthService {

  private logger: Logger = LoggerConfig.getLogger('AuthService');

  public auth(password: string): boolean {
    return password === SETTINGS.APPLICATION.AUTH.PASSWORD;
  }

}
