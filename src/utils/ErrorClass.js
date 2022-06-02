class GeneralError extends Error {
    constructor(statusCode = 500, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

class BadRequest extends GeneralError {
    constructor(message) {
        super();
        this.statusCode = 400;
        this.message = message;
    }
}

class NotFound extends GeneralError {
    constructor(message) {
        super();
        this.statusCode = 404;
        this.message = message;
    }
}

export {
    GeneralError,
    NotFound,
    BadRequest
}