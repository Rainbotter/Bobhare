import {singleton} from "tsyringe";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import {AnyValidateFunction} from "ajv/dist/core";
import {PostSectionRequestJsonSchema} from "../models/validators/post-section.validator";

@singleton()
export class RequestValidatorsConfig {

  private ajv = new Ajv();

  constructor() {
    addFormats(this.ajv);
    this.ajv.addSchema(PostSectionRequestJsonSchema);
  }

  public getValidatorFunctionOrThrowError<T>(validatorName: string): AnyValidateFunction<T> {
    const validateFunction = this.ajv.getSchema<T>(validatorName);
    if (validateFunction) {
      return validateFunction;
    } else {
      throw new Error(`Can't retrieve validator ${validatorName}`);
    }
  }

}
