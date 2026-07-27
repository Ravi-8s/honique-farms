const express = require("express");

const router = express.Router();

const {
  login,
} = require("../controllers/AuthController");

// =====================================================
// Authentication APIs
// =====================================================

router.post(
  "/login",
  login
);

module.exports = router;
