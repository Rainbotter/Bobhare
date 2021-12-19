import {Request} from "express";
import {RequestValidationError} from "../errors/request-validation.error";
import {container} from "tsyringe";
import {RequestValidatorsConfig} from "../../config/request-validator.config";

export abstract class InputValidator<T> {

  protected requestValidatorsConfig: RequestValidatorsConfig = container.resolve(RequestValidatorsConfig);

  protected validatorName: string;

  public validate(request: Request): Promise<T> {
    const validateFunction = this.requestValidatorsConfig.getValidatorFunctionOrThrowError(this.validatorName);

    const objectToValidate = Object.assign(Object.assign(Object.assign({}, request.body), (request.params)), request.query);

    return new Promise((resolve, reject) => {
      if (validateFunction(objectToValidate)) {
        resolve(objectToValidate as T);
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
