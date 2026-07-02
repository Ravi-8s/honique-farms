const express = require("express");

const router = express.Router();

const {
  getProducts,
  createProduct,
  editProduct,
  removeProduct,
} = require("../controllers/ProductController");

router.get("/", getProducts);

router.post("/", createProduct);

router.put("/:id", editProduct);

router.delete("/:id", removeProduct);

module.exports = router;
