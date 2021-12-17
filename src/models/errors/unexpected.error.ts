import {Errors} from "../enums/errors.enum";

export class UnexpectedError extends Error {

    constructor(message: string) {
        super(message);
        this.name = Errors.UNEXPECTED;
    }
}
