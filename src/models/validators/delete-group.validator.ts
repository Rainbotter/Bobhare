import {InputValidator} from './input.validator';
import {autoInjectable} from 'tsyringe';

const validatorName = 'DeleteGroupValidator';

@autoInjectable()
export class DeleteGroupValidator extends InputValidator<DeleteGroupRequest> {
  constructor() {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        sectionUuid: {
          type: 'string',
          nullable: false
        },
        groupUuid: {
          type: 'string',
          nullable: false
        },
      },
      required: ['sectionUuid', 'groupUuid'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface DeleteGroupRequest {
  sectionUuid: string;
  groupUuid: string;
}
