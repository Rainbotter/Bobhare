import {autoInjectable} from "tsyringe";
import {Request} from "express";
import {RequestValidationError} from "../models/errors/request-validation.error";

@autoInjectable()
export class RequestHelper {

    /**
     *
     * Creates a new object from the request body, the route params and the query params and validates it. <br/>
     * <ul>
     *     <li>If the object is valid, it is returned.</li>
     *     <li>If the object is invalid, the promise is rejected with all the errors.</li>
     * </ul>
     *
     * @param request
     * @param validateFunction
     */
    public validateRequestData<T>(request: Request, validateFunction): Promise<T> {

        const objectToValidate = Object.assign(Object.assign(Object.assign({}, request.body), (request.params)), request.query);

        return new Promise((resolve, reject) => {
            if (validateFunction(objectToValidate)) {
                resolve(objectToValidate);
            } else {
                if (validateFunction.errors && validateFunction.errors.length > 0) {
                    reject(new RequestValidationError(validateFunction.errors[0].schemaPath + " " + validateFunction.errors[0].message + ". Property name : " + validateFunction.errors[0].propertyName));
                } else {
                    reject();
                }
            }
        });
    }

}
