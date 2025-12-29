require('dotenv').config();
require('module-alias/register');

const app = require("@/app");
const {closeConnection} = require("@/config/database");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running local on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await closeConnection();
  process.exit(0);
});

startServer();