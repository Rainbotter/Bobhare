import {InputValidator} from './input.validator';
import {autoInjectable} from 'tsyringe';

const validatorName = 'PostAuthValidator';

@autoInjectable()
export class PostAuthValidator extends InputValidator<PostAuthRequest> {
  constructor() {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        password: {
          type: 'string',
          nullable: false
        },
      },
      required: ['password'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PostAuthRequest {
  password: string;
}
