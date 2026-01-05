const express = require("express");
const router = express.Router();
const userController = require("@/controllers/user.controller");
const { validate } = require("@/middleware/validate");
const asyncHandler = require("@/middleware/asyncHandler");
const { registerSchema, loginSchema } = require("@/validators/user.validator");

router.post(
  "/register",
  // #swagger.tags = ['Auth']
  // #swagger.description = 'Register a new user'
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/RegisterRequest" }
      }
    }
  } */
  /* #swagger.responses[201] = {
    description: "User registered successfully",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/AuthResponse" }
      }
    }
  } */
  validate(registerSchema),
  asyncHandler(userController.register.bind(userController))
);

router.post(
  "/login",
  // #swagger.tags = ['Auth']
  // #swagger.description = 'User login'
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/LoginRequest" }
      }
    }
  } */
  /* #swagger.responses[200] = {
    description: "Login successful",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/AuthResponse" }
      }
    }
  } */
  validate(loginSchema),
  asyncHandler(userController.login.bind(userController))
);

module.exports = router;
