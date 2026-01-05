require("module-alias/register");
const swaggerAutogen = require("swagger-autogen")({
  openapi: "3.0.0",
  autoHeaders: false,
  autoQuery: false,
  autoBody: false,
});
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
const fs = require("fs");
const indexRouterPath = path.join(__dirname, "../../routers/index.js");
const indexContent = fs.readFileSync(indexRouterPath, "utf8");

const routeConfig = {};
const routes = [];

const routerUseRegex = /router\.use\(["']([^"']+)["'],\s*(\w+)\)/g;
const requireRegex = /const\s+(\w+)\s*=\s*require\(["']\.\/([^"']+)["']\)/g;

const varToFile = {};
let match;
while ((match = requireRegex.exec(indexContent)) !== null) {
  varToFile[match[1]] = match[2];
}

while ((match = routerUseRegex.exec(indexContent)) !== null) {
  const prefix = match[1];
  const varName = match[2];
  const fileName = varToFile[varName];

  if (fileName) {
    routeConfig[fileName] = prefix;
    routes.push(path.join(__dirname, "../../routers", fileName));
  }
}

console.log("Auto-detected route configuration:", routeConfig);

swaggerAutogen(outputFile, routes, doc).then(({ success, data }) => {
  if (success) {
    const swaggerData = JSON.parse(fs.readFileSync(outputFile, "utf8"));

    const newPaths = {};
    const pathsByPrefix = {};

    const pathsArray = Object.keys(swaggerData.paths);
    const filesArray = Object.keys(routeConfig);

    const pathsPerFile = Math.ceil(pathsArray.length / filesArray.length);

    pathsArray.forEach((oldPath, index) => {
      const fileIndex = Math.min(
        Math.floor(index / pathsPerFile),
        filesArray.length - 1
      );
      const fileName = filesArray[fileIndex];
      const prefix = routeConfig[fileName];

      let newPath = oldPath;

      if (!oldPath.startsWith(prefix)) {
        newPath = prefix + oldPath;
      }

      newPaths[newPath] = swaggerData.paths[oldPath];
    });

    swaggerData.paths = newPaths;
    fs.writeFileSync(outputFile, JSON.stringify(swaggerData, null, 2));
    console.log("Swagger documentation generated successfully!");
  }
});
