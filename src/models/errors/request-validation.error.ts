import {Errors} from "../enums/errors.enum";

export class RequestValidationError extends Error {

    constructor(message: string) {
        super(message);
        this.name = Errors.REQUEST_VALIDATION_ERROR;
    }
}
