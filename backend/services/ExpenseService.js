const pool = require("../config/database");

// =====================================================
// Get Expense Categories
// =====================================================

const getExpenseCategories = async () => {

  const result = await pool.query(`
    SELECT
      id,
      name
    FROM expense_categories
    WHERE is_active = TRUE
    ORDER BY name;
  `);

  return result.rows;

};

// =====================================================
// Get All Expenses
// =====================================================

const getExpenses = async () => {

  const result = await pool.query(`
    SELECT
      e.id,
      c.name AS category,
      e.vendor,
      e.amount,
      e.description,
      e.expense_date
    FROM expenses e
    JOIN expense_categories c
      ON c.id = e.category_id
    ORDER BY e.expense_date DESC, e.id DESC;
  `);

  return result.rows;

};

// =====================================================
// Add Expense
// =====================================================

const addExpense = async (expense) => {

  const result = await pool.query(
    `
    INSERT INTO expenses
    (
      category_id,
      vendor,
      amount,
      description,
      expense_date
    )

    VALUES
    ($1,$2,$3,$4,$5)

    RETURNING *;
    `,
    [
      expense.categoryId,
      expense.vendor,
      expense.amount,
      expense.description,
      expense.expenseDate,
    ]
  );

  return result.rows[0];

};

// =====================================================
// Update Expense
// =====================================================

const updateExpense = async (id, expense) => {

  const result = await pool.query(
    `
    UPDATE expenses

    SET
      category_id = $1,
      vendor = $2,
      amount = $3,
      description = $4,
      expense_date = $5

    WHERE id = $6

    RETURNING *;
    `,
    [
      expense.categoryId,
      expense.vendor,
      expense.amount,
      expense.description,
      expense.expenseDate,
      id,
    ]
  );

  return result.rows[0];

};

// =====================================================
// Delete Expense
// =====================================================

const deleteExpense = async (id) => {

  await pool.query(
    `
    DELETE FROM expenses
    WHERE id = $1;
    `,
    [id]
  );

};

module.exports = {
  getExpenseCategories,
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
