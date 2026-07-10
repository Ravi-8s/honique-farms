const express = require("express");

const router = express.Router();

const {
  fetchExpenseCategories,
  fetchExpenses,
  createExpense,
  editExpense,
  removeExpense,
} = require("../controllers/ExpenseController");

// =====================================================
// Expense Categories
// =====================================================

router.get(
  "/categories",
  fetchExpenseCategories
);

// =====================================================
// Expense APIs
// =====================================================

router.get(
  "/",
  fetchExpenses
);

router.post(
  "/",
  createExpense
);

router.put(
  "/:id",
  editExpense
);

router.delete(
  "/:id",
  removeExpense
);

module.exports = router;
