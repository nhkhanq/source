const { Sequelize } = require("sequelize");
const config = require("@/config");

const sequelize = new Sequelize(config);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

const closeConnection = async () => {
  try {
    await sequelize.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error closing database:", error);
  }
};

module.exports = {
  sequelize,
  testConnection,
  closeConnection,
};