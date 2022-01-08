import {InputValidator} from './input.validator';
import {autoInjectable} from 'tsyringe';

const validatorName = 'DeleteSectionValidator';

@autoInjectable()
export class DeleteSectionValidator extends InputValidator<DeleteSectionRequest> {
  constructor() {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          nullable: false
        },
      },
      required: ['uuid'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface DeleteSectionRequest {
  uuid: string;
}
