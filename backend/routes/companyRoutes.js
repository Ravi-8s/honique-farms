const express = require("express");

const router = express.Router();

const {
  fetchCompanySettings,
  updateSettings,
} = require("../controllers/CompanyController");

// =====================================================
// Company Settings APIs
// =====================================================

router.get(
  "/",
  fetchCompanySettings
);

router.put(
  "/",
  updateSettings
);

module.exports = router;
