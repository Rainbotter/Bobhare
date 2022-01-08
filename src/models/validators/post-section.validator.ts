import { InputValidator } from './input.validator';
import { autoInjectable } from 'tsyringe';

const validatorName = 'PostSectionValidator';

@autoInjectable()
export class PostSectionValidator extends InputValidator<PostSectionRequest> {
  constructor () {
    super({
      $id: validatorName,
      type: 'object',
      properties: {
        title: {
          type: 'string',
          nullable: false,
          maxLength: 255
        }
      },
      required: ['title'],
      additionalProperties: false
    });
    this.validatorName = validatorName;
  }
}

export interface PostSectionRequest {
  title: string;
}
