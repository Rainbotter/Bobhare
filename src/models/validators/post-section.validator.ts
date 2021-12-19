import {InputValidator} from "./input.validator";
import {autoInjectable} from "tsyringe";
import {JSONSchemaType} from "ajv";
import {PostSectionRequest} from "../dto/post-section.request";

const validatorName = "AddUserToFolderRequest";

@autoInjectable()
export class PostSectionValidator extends InputValidator<PostSectionRequest> {
  constructor() {
    super();
    this.validatorName = validatorName;
  }
}

export const PostSectionRequestJsonSchema: JSONSchemaType<PostSectionRequest> = {
  $id: validatorName,
  type: "object",
  properties: {
    title: {type: 'string', nullable: false}
  },
  required: ['title'],
  additionalProperties: false
};
