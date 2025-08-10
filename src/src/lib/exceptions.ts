export class UnknownError extends Error {
    constructor() {
        super("An unknown error occurred.");
        this.name = "UnknownError";
        Object.setPrototypeOf(this, UnknownError.prototype);
    }
}

export class InvalidSessionError extends Error {
    constructor() {
        super("The session is invalid.");
        this.name = "InvalidSessionError";
        Object.setPrototypeOf(this, InvalidSessionError.prototype);
    }
}