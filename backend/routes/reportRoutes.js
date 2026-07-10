const express = require("express");

const router = express.Router();

const {
  fetchSummary,
} = require("../controllers/ReportController");

// =====================================================
// Report APIs
// =====================================================

router.get(
  "/summary",
  fetchSummary
);

module.exports = router;
