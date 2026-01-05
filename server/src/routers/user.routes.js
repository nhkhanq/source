const express = require("express");
const router = express.Router();
const userController = require("@/controllers/user.controller");
const { validate } = require("@/middleware/validate");
const { auth } = require("@/middleware/auth");
const { checkPermission } = require("@/middleware/casbin");
const asyncHandler = require("@/middleware/asyncHandler");
const {
  updateUserSchema,
  createUserSchema,
} = require("@/validators/user.validator");

router.get(
  "/me",
  // #swagger.tags = ['User']
  // #swagger.description = 'Get current user info'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.responses[200] = {
    description: "User info retrieved",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/UserResponse" }
      }
    }
  } */
  auth,
  asyncHandler(userController.getMe.bind(userController))
);

router.get(
  "/",
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Get all users (Admin only)'
  // #swagger.security = [{ "bearerAuth": [] }]
  auth,
  checkPermission("user", "read"),
  asyncHandler(userController.getAllUsers.bind(userController))
);

router.get(
  "/:id",
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Get user by ID (Admin only)'
  // #swagger.security = [{ "bearerAuth": [] }]
  auth,
  checkPermission("user", "read"),
  asyncHandler(userController.getUserById.bind(userController))
);

router.post(
  "/",
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Create new user (Admin only)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/CreateUserRequest" }
      }
    }
  } */
  /* #swagger.responses[201] = {
    description: "User created successfully",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/UserResponse" }
      }
    }
  } */
  auth,
  checkPermission("user", "write"),
  validate(createUserSchema),
  asyncHandler(userController.createUser.bind(userController))
);

router.put(
  "/:id",
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Update user (Admin only)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/UpdateUserRequest" }
      }
    }
  } */
  /* #swagger.responses[200] = {
    description: "User updated successfully",
    content: {
      "application/json": {
        schema: { $ref: "#/components/schemas/UserResponse" }
      }
    }
  } */
  auth,
  checkPermission("user", "write"),
  validate(updateUserSchema),
  asyncHandler(userController.updateUser.bind(userController))
);

router.delete(
  "/:id",
  // #swagger.tags = ['Admin']
  // #swagger.description = 'Delete user (Admin only)'
  // #swagger.security = [{ "bearerAuth": [] }]
  /* #swagger.responses[204] = {
    description: "User deleted successfully"
  } */
  auth,
  checkPermission("user", "delete"),
  asyncHandler(userController.deleteUser.bind(userController))
);

module.exports = router;
