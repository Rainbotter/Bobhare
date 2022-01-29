import {InputValidator} from './input.validator';
import {autoInjectable} from 'tsyringe';

const validatorName = 'PutGroupValidator';

@autoInjectable()
export class PutGroupValidator extends InputValidator<PutGroupRequest> {
  constructor() {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        groupUuid: {
          type: 'string',
          nullable: false
        },
        sectionUuid: {
          type: 'string',
          nullable: false,
          maxLength: 255
        },
        title: {
          type: 'string',
          nullable: false,
          maxLength: 255
        },
        color: {
          type: 'string',
          nullable: false,
          maxLength: 10
        }
      },
      required: ['groupUuid', 'sectionUuid', 'title', 'color'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PutGroupRequest {
  groupUuid: string;
  sectionUuid: string;
  title: string;
  color: string;
}
