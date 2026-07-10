const pool = require("../config/database");

// =====================================================
// Create Invoice
// =====================================================

const createInvoice = async (client, orderId) => {

  // Create invoice record first

  const invoiceResult = await client.query(
    `
    INSERT INTO invoices
    (
      order_id
    )
    VALUES
    (
      $1
    )
    RETURNING id;
    `,
    [orderId]
  );

  const invoiceId = invoiceResult.rows[0].id;

  const year = new Date().getFullYear();

  const invoiceNumber =
    `HF-${year}-${String(invoiceId).padStart(6, "0")}`;

  const result = await client.query(
    `
    UPDATE invoices
    SET invoice_number = $1
    WHERE id = $2
    RETURNING *;
    `,
    [
      invoiceNumber,
      invoiceId,
    ]
  );

  return result.rows[0];

};

// =====================================================
// Get Invoice By Order
// =====================================================

const getInvoiceByOrder = async (orderId) => {

  const result = await pool.query(
    `
    SELECT *
    FROM invoices
    WHERE order_id = $1
    `,
    [orderId]
  );

  return result.rows[0];

};

// =====================================================
// Get All Invoices
// =====================================================

const getInvoices = async () => {

  const result = await pool.query(
    `
    SELECT

      i.id,

      i.invoice_number,

      i.invoice_date,

      c.name AS customer_name,

      c.phone,

      o.total_amount

    FROM invoices i

    JOIN orders o
      ON o.id = i.order_id

    JOIN customers c
      ON c.id = o.customer_id

    ORDER BY i.id DESC;
    `
  );

  return result.rows;

};

// =====================================================
// Get Complete Invoice Details
// =====================================================

const getInvoiceDetails = async (invoiceId) => {

  const headerResult = await pool.query(
    `
    SELECT

      i.id,

      i.invoice_number,

      i.invoice_date,

      o.total_amount,

      c.name AS customer_name,

      c.phone,

      c.email,

      cs.company_name,

      cs.tagline,

      cs.address,

      cs.city,

      cs.state,

      cs.pincode,

      cs.phone AS company_phone,

      cs.email AS company_email,

      cs.website,

      cs.fssai_number

    FROM invoices i

    JOIN orders o
      ON o.id = i.order_id

    JOIN customers c
      ON c.id = o.customer_id

    CROSS JOIN company_settings cs

    WHERE i.id = $1;
    `,
    [invoiceId]
  );

  if (headerResult.rows.length === 0) {

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

    FROM invoices i

    JOIN order_items oi
      ON oi.order_id = i.order_id

    JOIN products p
      ON p.id = oi.product_id

    WHERE i.id = $1

    ORDER BY oi.id;
    `,
    [invoiceId]
  );

  return {

    ...headerResult.rows[0],

    items: itemsResult.rows,

  };

};

module.exports = {

  createInvoice,

  getInvoiceByOrder,

  getInvoices,

  getInvoiceDetails,

};
