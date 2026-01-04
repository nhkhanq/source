const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");

const { testConnection } = require("@/config/database");
const routers = require("@/routers");
const { errorHandler, notFound } = require("@/middleware/errorHandler");
const { initCasbin } = require("@/middleware/casbin");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api", routers);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

testConnection();
initCasbin();

app.use(notFound);

// const distPath = path.join(__dirname, "src", "view", "dist");
// app.use(express.static(distPath));

module.exports = app;
