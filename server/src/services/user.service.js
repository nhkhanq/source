const User = require("@/models/user.model");
const AppError = require("@/utils/AppError");
const { ERROR_CODES, HTTP_STATUS } = require("@/constants");
const { Op } = require("sequelize");

class UserService {
  async getAllUsers(query = {}) {
    const { page = 1, limit = 10, search, status } = query;
    const offset = (page - 1) * limit;
    const where = {};

    if (search) {
      where[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    if (status) where.status = status;

    const { count, rows } = await User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    return {
      users: rows,
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
    };
  }

  async getUserById(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new AppError(ERROR_CODES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async createUser(data) {
    const existing = await User.findOne({
      where: {
        [Op.or]: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existing) {
      throw new AppError(ERROR_CODES.USER_EXISTS, HTTP_STATUS.CONFLICT);
    }

    return await User.create(data);
  }

  async updateUser(id, data) {
    const user = await this.getUserById(id);
    return await user.update(data);
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new AppError(
        ERROR_CODES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      throw new AppError(
        ERROR_CODES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    if (user.status === "banned") {
      throw new AppError(ERROR_CODES.USER_BANNED, HTTP_STATUS.FORBIDDEN);
    }

    if (user.status === "inactive") {
      throw new AppError(ERROR_CODES.USER_INACTIVE, HTTP_STATUS.FORBIDDEN);
    }

    return user;
  }
}

module.exports = new UserService();
