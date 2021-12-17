import {Errors} from "../enums/errors.enum";

export class InvalidValueError extends Error {

    constructor(message: string) {
        super(message);
        this.name = Errors.INVALID_VALUE;
    }
}
