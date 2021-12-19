import {ResponseHelper} from "../helpers/response-helper";
import {container} from "tsyringe";

export abstract class Controller {

    protected responseHelper: ResponseHelper = container.resolve(ResponseHelper);

}
