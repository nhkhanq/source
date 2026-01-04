const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const path = require("path");
const definitions = require("./definitions");

const doc = {
  info: {
    title: "API Documentation",
    description: "API Documentation",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token (without 'Bearer' prefix)",
      },
    },
    schemas: definitions,
  },
};

const outputFile = path.join(__dirname, "./swagger-output.json");
const routes = [path.join(__dirname, "../../routers/index.js")];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger documentation generated!");
});
