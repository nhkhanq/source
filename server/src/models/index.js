const User = require('./user.model');
const Permission = require('./permission.model');
const Role = require('./role.model');
require('./associations');

module.exports = {
  User,
  Permission,
  Role,
};
