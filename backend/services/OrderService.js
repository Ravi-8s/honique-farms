const pool = require("../config/database");

const {
  createInvoice,
} = require("./InvoiceService");

// =====================================================
// Create Order
// =====================================================

const createOrder = async (orderData) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    let totalAmount = 0;

    const productDetails = [];

    // =====================================================
    // Validate Inventory
    // =====================================================

    for (const item of orderData.items) {

      const stockResult = await client.query(
        `
        SELECT
          i.quantity,
          p.name,
          p.price
        FROM inventory i
        JOIN products p
          ON p.id = i.product_id
        WHERE i.product_id = $1
        `,
        [item.productId]
      );

      if (stockResult.rows.length === 0) {

        throw new Error(
          "Product not found in inventory"
        );

      }

      const stock = stockResult.rows[0];

      if (stock.quantity < item.quantity) {

        throw new Error(
          `Not enough stock for ${stock.name}`
        );

      }

      const subtotal =
        Number(stock.price) * item.quantity;

      totalAmount += subtotal;

      productDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        price: Number(stock.price),
        subtotal,
      });

    }

    // =====================================================
    // Create Order
    // =====================================================

    const orderResult = await client.query(
      `
      INSERT INTO orders
      (
        customer_id,
        total_amount
      )
      VALUES
      ($1,$2)
      RETURNING id;
      `,
      [
        orderData.customerId,
        totalAmount,
      ]
    );

    const orderId = orderResult.rows[0].id;

    // =====================================================
    // Create Order Items
    // =====================================================

    for (const product of productDetails) {

      await client.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price,
          subtotal
        )
        VALUES
        ($1,$2,$3,$4,$5)
        `,
        [
          orderId,
          product.productId,
          product.quantity,
          product.price,
          product.subtotal,
        ]
      );

    }

    // =====================================================
    // Update Inventory
    // =====================================================

    for (const product of productDetails) {

      await client.query(
        `
        UPDATE inventory
        SET quantity = quantity - $1
        WHERE product_id = $2
        `,
        [
          product.quantity,
          product.productId,
        ]
      );

    }

    // =====================================================
    // Create Invoice
    // =====================================================

    const invoice = await createInvoice(
      client,
      orderId
    );

    // =====================================================
    // Commit Transaction
    // =====================================================

    await client.query("COMMIT");

    return {

      message: "Order created successfully",

      orderId,

      invoiceNumber:
        invoice.invoice_number,

      totalAmount,

    };

  } catch (error) {

    await client.query("ROLLBACK");

    throw error;

  } finally {

    client.release();

  }

};

// =====================================================
// Get All Orders
// =====================================================

const getOrders = async () => {

  const result = await pool.query(`
    SELECT
      o.id,
      c.name AS customer,
      o.order_date,
      o.status,
      o.total_amount
    FROM orders o
    JOIN customers c
      ON c.id = o.customer_id
    ORDER BY o.id DESC
  `);

  return result.rows;

};

// =====================================================
// Get Order By Id
// =====================================================

const getOrderById = async (id) => {

  const orderResult = await pool.query(
    `
    SELECT
      o.id,
      c.name AS customer,
      c.phone,
      c.email,
      o.order_date,
      o.status,
      o.total_amount
    FROM orders o
    JOIN customers c
      ON c.id = o.customer_id
    WHERE o.id = $1
    `,
    [id]
  );

  if (orderResult.rows.length === 0) {

    return null;

  }

  const itemsResult = await pool.query(
    `
    SELECT
      p.name,
      p.weight,
      oi.quantity,
      oi.price,
      oi.subtotal
    FROM order_items oi
    JOIN products p
      ON p.id = oi.product_id
    WHERE oi.order_id = $1
    ORDER BY oi.id
    `,
    [id]
  );

  return {

    ...orderResult.rows[0],

    items: itemsResult.rows,

  };

};

// =====================================================
// Update Order Status
// =====================================================

const updateOrderStatus = async (
  id,
  status
) => {

  const result = await pool.query(
    `
    UPDATE orders
    SET status = $1
    WHERE id = $2
    RETURNING
      id,
      status;
    `,
    [
      status,
      id,
    ]
  );

  return result.rows[0];

};

module.exports = {

  createOrder,

  getOrders,

  getOrderById,

  updateOrderStatus,

};
