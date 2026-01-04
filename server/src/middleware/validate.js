const AppError = require("@/utils/AppError");
const { ERROR_CODES, HTTP_STATUS } = require("@/constants");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    return next(
      new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        details
      )
    );
  }

  req.body = value;
  next();
};

const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((d) => ({
      field: d.path.join("."),
      message: d.message,
    }));
    return next(
      new AppError(
        ERROR_CODES.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        details
      )
    );
  }

  req.query = value;
  next();
};

module.exports = { validate, validateQuery };
