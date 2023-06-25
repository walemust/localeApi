class CustomError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode,
        //400 -> 500 is for operational errors 
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;

        //from the  Error class
        //this tells us exactly where the error has occurred in the code
        Error.captureStackTrace(this, this.constructor)

    }
}

module.exports = CustomError;