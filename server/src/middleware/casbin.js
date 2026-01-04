const { newEnforcer } = require("casbin");
const path = require("path");
const AppError = require("@/utils/AppError");
const { ERROR_CODES, HTTP_STATUS } = require("@/constants");

let enforcer = null;

const initCasbin = async () => {
  const modelPath = path.join(__dirname, "../config/casbin/model.conf");
  const policyPath = path.join(__dirname, "../config/casbin/policy.csv");

  enforcer = await newEnforcer(modelPath, policyPath);
  console.log("Casbin initialized");
  return enforcer;
};

const checkPermission = (obj, act) => {
  return async (req, res, next) => {
    try {
      if (!enforcer) {
        await initCasbin();
      }

      const userId = req.user?.id?.toString();
      const role = req.user?.role;

      if (!userId || !role) {
        return next(
          new AppError(ERROR_CODES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED)
        );
      }

      const allowed = await enforcer.enforce(role, obj, act);

      if (!allowed) {
        return next(new AppError(ERROR_CODES.FORBIDDEN, HTTP_STATUS.FORBIDDEN));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

const getEnforcer = () => enforcer;

module.exports = {
  initCasbin,
  checkPermission,
  getEnforcer,
};
