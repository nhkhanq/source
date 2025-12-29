const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const { testConnection } = require("@/config/database");
const routers = require("@/routers");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

try {
  const swaggerFile = require("../src/utils/swagger/swagger-output.json");
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
} catch (err) {
  console.log("Swagger file not found.");
}

// Use routers
app.use("/api/v1", routers);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

testConnection();

// const distPath = path.join(__dirname, "src", "view", "dist");
// app.use(express.static(distPath));

module.exports = app;
