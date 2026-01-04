const jwt = require("jsonwebtoken");
const AppError = require("@/utils/AppError");
const { ERROR_CODES, HTTP_STATUS } = require("@/constants");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AppError(ERROR_CODES.TOKEN_REQUIRED, HTTP_STATUS.UNAUTHORIZED)
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { auth };
