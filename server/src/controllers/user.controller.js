const userService = require("@/services/user.service");
const { success } = require("@/utils/response");
const { HTTP_STATUS } = require("@/constants");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    const user = await userService.createUser(req.body);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return success(res, { user, token }, HTTP_STATUS.CREATED);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return success(res, { user, token });
  }

  async getMe(req, res) {
    const user = await userService.getUserById(req.user.id);
    return success(res, user);
  }

  async getAllUsers(req, res) {
    const result = await userService.getAllUsers(req.query);
    return success(res, result);
  }

  async getUserById(req, res) {
    const user = await userService.getUserById(req.params.id);
    return success(res, user);
  }

  async updateUser(req, res) {
    const user = await userService.updateUser(req.params.id, req.body);
    return success(res, user);
  }

  async deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    return success(res, null, HTTP_STATUS.NO_CONTENT);
  }
}

module.exports = new UserController();
