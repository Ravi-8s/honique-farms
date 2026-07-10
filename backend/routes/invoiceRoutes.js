const express = require("express");

const router = express.Router();

const {
  fetchInvoices,
  fetchInvoiceDetails,
} = require("../controllers/InvoiceController");

// =====================================================
// Invoice APIs
// =====================================================

// Get all invoices

router.get(
  "/",
  fetchInvoices
);

// Get invoice details

router.get(
  "/:id",
  fetchInvoiceDetails
);

module.exports = router;
