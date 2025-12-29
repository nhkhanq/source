const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/database");

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
