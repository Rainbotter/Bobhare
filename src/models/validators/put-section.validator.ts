import { InputValidator } from './input.validator';
import { autoInjectable } from 'tsyringe';

const validatorName = 'PutSectionValidator';

@autoInjectable()
export class PutSectionValidator extends InputValidator<PutSectionRequest> {
  constructor () {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        title: {
          type: 'string',
          nullable: false
        },
        uuid: {
          type: 'string',
          nullable: false
        },
      },
      required: ['title'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PutSectionRequest {
  uuid: string;
  title: string;
}
