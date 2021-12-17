import {Errors} from "../enums/errors.enum";

export class ForbiddenError extends Error {

    constructor(message: string) {
        super(message);
        this.name = Errors.FORBIDDEN;
    }
}
