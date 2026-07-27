const pool = require("../config/database");

const getAllCustomers = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      is_active AS "isActive"
    FROM customers
    ORDER BY name;
  `);

  return result.rows;
};

const addCustomer = async (customer) => {
  const result = await pool.query(
    `
    INSERT INTO customers
    (
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode
    )

    VALUES
    ($1,$2,$3,$4,$5,$6,$7)

    RETURNING
      id,
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      is_active AS "isActive";
    `,
    [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
      customer.city,
      customer.state,
      customer.pincode,
    ]
  );

  return result.rows[0];
};

const updateCustomer = async (id, customer) => {
  const result = await pool.query(
    `
    UPDATE customers
    SET
      name = $1,
      phone = $2,
      email = $3,
      address = $4,
      city = $5,
      state = $6,
      pincode = $7
    WHERE id = $8

    RETURNING
      id,
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      is_active AS "isActive";
    `,
    [
      customer.name,
      customer.phone,
      customer.email,
      customer.address,
      customer.city,
      customer.state,
      customer.pincode,
      id,
    ]
  );

  return result.rows[0];
};

const deleteCustomer = async (id) => {

  const orderCheck = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM orders
    WHERE customer_id = $1;
    `,
    [id]
  );

  if (Number(orderCheck.rows[0].total) > 0) {
    throw new Error(
      "Cannot delete customer because they have existing orders."
    );
  }

  await pool.query(
    `
    DELETE FROM customers
    WHERE id = $1;
    `,
    [id]
  );
};

module.exports = {
  getAllCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
