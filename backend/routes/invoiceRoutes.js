const express = require("express");

const router = express.Router();

const {
  fetchInvoiceDetails,
} = require("../controllers/InvoiceController");

// =====================================================
// Invoice APIs
// =====================================================

router.get(
  "/:id",
  fetchInvoiceDetails
);

module.exports = router;
