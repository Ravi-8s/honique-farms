const pool = require("../config/database");

// =====================================================
// Dashboard Summary Report
// =====================================================

const getSummary = async () => {

  const revenueResult = await pool.query(`
    SELECT
      COALESCE(SUM(total_amount), 0) AS revenue
    FROM orders;
  `);

  const expenseResult = await pool.query(`
    SELECT
      COALESCE(SUM(amount), 0) AS expenses
    FROM expenses;
  `);

  const customerResult = await pool.query(`
    SELECT
      COUNT(*) AS customers
    FROM customers
    WHERE is_active = TRUE;
  `);

  const orderResult = await pool.query(`
    SELECT
      COUNT(*) AS orders
    FROM orders;
  `);

  const revenue = Number(
    revenueResult.rows[0].revenue
  );

  const expenses = Number(
    expenseResult.rows[0].expenses
  );

  const profit = revenue - expenses;

  const profitMargin =
    revenue > 0
      ? Number(
          ((profit / revenue) * 100).toFixed(2)
        )
      : 0;

  return {

    totalRevenue: revenue,

    totalExpenses: expenses,

    profit,

    profitMargin,

    totalCustomers: Number(
      customerResult.rows[0].customers
    ),

    totalOrders: Number(
      orderResult.rows[0].orders
    ),

  };

};

module.exports = {
  getSummary,
};
