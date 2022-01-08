import { InputValidator } from './input.validator';
import { autoInjectable } from 'tsyringe';

const validatorName = 'PostGroupValidator';

@autoInjectable()
export class PostGroupValidator extends InputValidator<PostGroupRequest> {
  constructor () {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
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
      required: ['title', 'color'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PostGroupRequest {
  sectionUuid: string;
  title: string;
  color: string;
}
