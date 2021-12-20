import { singleton } from 'tsyringe';
import Ajv, { AnySchema } from 'ajv';
import addFormats from 'ajv-formats';
import { AnyValidateFunction } from 'ajv/dist/core';

@singleton()
export class RequestValidatorsConfig {

  private ajv = new Ajv();

  constructor () {
    addFormats(this.ajv);
  }

  public registerSchema (schema: AnySchema): void {
    this.ajv.addSchema(schema);
  }

  public getValidatorFunctionOrThrowError<T> (validatorName: string): AnyValidateFunction<T> {
    const validateFunction = this.ajv.getSchema<T>(validatorName);
    if (validateFunction) {
      return validateFunction;
    } else {
      throw new Error(`Can't retrieve validator ${validatorName}`);
    }
  }

}
