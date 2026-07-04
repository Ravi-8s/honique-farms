const express = require("express");

const router = express.Router();

const {
  getCategories,
  createCategory,
  editCategory,
  removeCategory,
} = require("../controllers/CategoryController");

router.get("/", getCategories);

router.post("/", createCategory);

router.put("/:id", editCategory);

router.delete("/:id", removeCategory);

module.exports = router;
