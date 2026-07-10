const express = require("express");

const router = express.Router();

const {
  fetchDashboardSummary,
} = require("../controllers/DashboardController");

// =====================================================
// Dashboard APIs
// =====================================================

router.get("/", fetchDashboardSummary);

module.exports = router;
