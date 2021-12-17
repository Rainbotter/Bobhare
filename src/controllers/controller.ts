import {ResponseHelper} from "../helpers/response-helper";
import {container} from "tsyringe";
import {RequestHelper} from "../helpers/request-helper";

export abstract class Controller {

    protected responseHelper: ResponseHelper = container.resolve(ResponseHelper);
    protected requestHelper: RequestHelper = container.resolve(RequestHelper);

}
