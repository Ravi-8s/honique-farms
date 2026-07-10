const {
  getExpenseCategories,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../services/ExpenseService");

// =====================================================
// Get Expense Categories
// =====================================================

const fetchExpenseCategories = async (req, res) => {

  try {

    const categories = await getExpenseCategories();

    res.json(categories);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expense categories",
    });

  }

};

// =====================================================
// Get All Expenses
// =====================================================

const fetchExpenses = async (req, res) => {

  try {

    const expenses = await getExpenses();

    res.json(expenses);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expenses",
    });

  }

};

// =====================================================
// Create Expense
// =====================================================

const createExpense = async (req, res) => {

  try {

    const expense = await addExpense(req.body);

    res.status(201).json(expense);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create expense",
    });

  }

};

// =====================================================
// Update Expense
// =====================================================

const editExpense = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const expense = await updateExpense(
      id,
      req.body
    );

    res.json(expense);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update expense",
    });

  }

};

// =====================================================
// Delete Expense
// =====================================================

const removeExpense = async (req, res) => {

  try {

    const id = Number(req.params.id);

    await deleteExpense(id);

    res.json({
      message: "Expense deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete expense",
    });

  }

};

module.exports = {
  fetchExpenseCategories,
  fetchExpenses,
  createExpense,
  editExpense,
  removeExpense,
};
