const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");

router.get("/health", (req, res) => {
  res.json({
    success: true,
    data: {
      status: "OK",
      timestamp: new Date().toISOString(),
    },
  });
});

router.use("/users", userRoutes);

module.exports = router;
