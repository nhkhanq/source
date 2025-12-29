require("dotenv").config();
require("module-alias/register");

const { sequelize } = require("@/config/database");
require("@/models");
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database tables synchronized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
};

syncDatabase();
