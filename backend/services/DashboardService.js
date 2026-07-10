const pool = require("../config/database");

// =====================================================
// Dashboard Summary
// =====================================================

const getDashboardSummary = async () => {

  const [
    products,
    customers,
    orders,
    revenue,
    lowStock,
    recentOrders,
  ] = await Promise.all([

    pool.query(`
      SELECT COUNT(*) AS total
      FROM products
      WHERE is_active = TRUE;
    `),

    pool.query(`
      SELECT COUNT(*) AS total
      FROM customers
      WHERE is_active = TRUE;
    `),

    pool.query(`
      SELECT COUNT(*) AS total
      FROM orders;
    `),

    pool.query(`
      SELECT
        COALESCE(SUM(total_amount),0) AS revenue
      FROM orders
      WHERE status <> 'Cancelled';
    `),

    pool.query(`
      SELECT
        p.name,
        i.quantity
      FROM inventory i
      JOIN products p
        ON p.id = i.product_id
      WHERE i.quantity <= 20
      ORDER BY i.quantity;
    `),

    pool.query(`
      SELECT
        o.id,
        c.name AS customer,
        o.total_amount,
        o.status
      FROM orders o
      JOIN customers c
        ON c.id = o.customer_id
      ORDER BY o.id DESC
      LIMIT 5;
    `),

  ]);

  return {

    totalProducts:
      Number(products.rows[0].total),

    totalCustomers:
      Number(customers.rows[0].total),

    totalOrders:
      Number(orders.rows[0].total),

    totalRevenue:
      Number(revenue.rows[0].revenue),

    lowStockProducts:
      lowStock.rows,

    recentOrders:
      recentOrders.rows,

  };

};

module.exports = {
  getDashboardSummary,
};
