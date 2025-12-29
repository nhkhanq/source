const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/database");

const Permission = sequelize.define("Permission", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  permission_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Permission;
