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
        sectionUuid: {
          type: 'string',
          nullable: false
        },
      },
      required: ['sectionUuid', 'title'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PutSectionRequest {
  sectionUuid: string;
  title: string;
}
