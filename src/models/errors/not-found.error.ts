import {Errors} from "../enums/errors.enum";

export class NotFoundError extends Error {

    constructor(message: string) {
        super(message);
        this.name = Errors.NOT_FOUND;
    }
}
