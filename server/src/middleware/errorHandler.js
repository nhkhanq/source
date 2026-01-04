const { ERROR_CODES, HTTP_STATUS } = require("@/constants");

const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let errorCode = err.errorCode || ERROR_CODES.INTERNAL_ERROR;
  let details = err.details || null;

  if (err.name === "SequelizeValidationError") {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
    details = err.errors.map((e) => ({ field: e.path, message: e.message }));
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = HTTP_STATUS.CONFLICT;
    errorCode = ERROR_CODES.DUPLICATE_ENTRY;
    details = { field: err.errors[0]?.path };
  }

  if (err.name === "JsonWebTokenError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    errorCode = ERROR_CODES.TOKEN_INVALID;
  }

  if (err.name === "TokenExpiredError") {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    errorCode = ERROR_CODES.TOKEN_EXPIRED;
  }

  if (err.isJoi) {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
    details = err.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
  }

  res.status(statusCode).json({
    success: false,
    errorCode,
    details,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

const notFound = (req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    errorCode: ERROR_CODES.NOT_FOUND,
    details: { path: req.originalUrl },
  });
};

module.exports = { errorHandler, notFound };
