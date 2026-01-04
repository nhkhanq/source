const definitions = {
  RegisterRequest: {
    username: "john_doe",
    email: "john@example.com",
    password: "123456",
  },
  LoginRequest: {
    email: "john@example.com",
    password: "123456",
  },
  UpdateUserRequest: {
    username: "john_updated",
    email: "john_updated@example.com",
    status: "active",
  },

  UserResponse: {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    created_at: "2026-01-04T00:00:00.000Z",
    updated_at: "2026-01-04T00:00:00.000Z",
  },
  AuthResponse: {
    user: { $ref: "#/definitions/UserResponse" },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
  SuccessResponse: {
    success: true,
    message: "Success",
    data: {},
  },
  ErrorResponse: {
    success: false,
    message: "Error message",
    error: "Error details",
  },
  PaginatedResponse: {
    success: true,
    data: {
      rows: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    },
  },
};

module.exports = definitions;
