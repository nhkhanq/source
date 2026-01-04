const HTTP_STATUS = require("@/constants/httpStatus");

const success = (res, data = null, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

const error = (
  res,
  errorCode,
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details = null
) => {
  return res.status(statusCode).json({
    success: false,
    errorCode,
    details,
  });
};

module.exports = { success, error };
