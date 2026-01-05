const HTTP_STATUS = require("@/constants/httpStatus");

class AppError extends Error {
  constructor(
    errorCode,
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    details = null
  ) {
    super(errorCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
