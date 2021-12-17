import {LoggerConfig} from "../config/logger.config";
import {Logger} from "winston";
import {injectable} from "tsyringe";

@injectable()
export class BookmarkService {

  private logger: Logger = LoggerConfig.getLogger("UserDeviceService");

}
