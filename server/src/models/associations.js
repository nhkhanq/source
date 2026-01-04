// const User = require("./user.model");
// const Permission = require("./permission.model");
// const Role = require("./role.model");

// Permission.hasMany(User, {
//   foreignKey: "permission_code",
//   sourceKey: "permission_code",
//   as: "users",
// });

// User.belongsTo(Permission, {
//   foreignKey: "permission_code",
//   targetKey: "permission_code",
//   as: "permission",
// });

// Role.hasMany(User, {
//   foreignKey: "role_id",
//   sourceKey: "id",
//   as: "users",
// });

// User.belongsTo(Role, {
//   foreignKey: "role_id",
//   targetKey: "id",
//   as: "role",
// });

// module.exports = {
//   User,
//   Permission,
//   Role,
// };
