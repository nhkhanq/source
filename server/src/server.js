require("dotenv").config();
require("module-alias/register");

const app = require("@/app");
const { closeConnection } = require("@/config/database");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const generateSwagger = () => {
  if (process.env.NODE_ENV !== "production") {
    const swaggerPath = path.join(
      __dirname,
      "utils/swagger/swagger-output.json"
    );

    if (!fs.existsSync(swaggerPath)) {
      console.log("Generating Swagger documentation...");
      require("./utils/swagger/swaggerAutogen");
    }
  }
};

const startServer = async () => {
  try {
    generateSwagger();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
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
