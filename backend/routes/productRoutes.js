const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProductsForOrders,
  createProduct,
  editProduct,
  removeProduct,
} = require("../controllers/ProductController");

// =====================================================
// Product APIs
// =====================================================

router.get("/", getProducts);

// Products available for Orders
router.get("/available", getProductsForOrders);

router.post("/", createProduct);

router.put("/:id", editProduct);

router.delete("/:id", removeProduct);

module.exports = router;
