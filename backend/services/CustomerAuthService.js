const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerCustomer = async (customer) => {

  const emailExists = await pool.query(
    `
    SELECT id
    FROM customers
    WHERE email = $1;
    `,
    [customer.email]
  );

  if (emailExists.rows.length > 0) {
    throw new Error("Email already registered.");
  }

  const phoneExists = await pool.query(
    `
    SELECT id
    FROM customers
    WHERE phone = $1;
    `,
    [customer.phone]
  );

  if (phoneExists.rows.length > 0) {
    throw new Error("Phone number already registered.");
  }

  const hashedPassword = await bcrypt.hash(
    customer.password,
    10
  );

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
      pincode,
      password
    )

    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8)

    RETURNING
      id,
      name,
      phone,
      email;
    `,
    [
      customer.name,
      customer.phone,
      customer.email,
      customer.address || "",
      customer.city || "",
      customer.state || "",
      customer.pincode || "",
      hashedPassword,
    ]
  );

  const savedCustomer = result.rows[0];

  const token = jwt.sign(

    {
      id: savedCustomer.id,
      email: savedCustomer.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

  return {

    token,

    customer: savedCustomer,

  };

};

const loginCustomer = async (
  email,
  password
) => {

  const result = await pool.query(
    `
    SELECT *
    FROM customers
    WHERE email = $1;
    `,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password.");
  }

  const customer = result.rows[0];

  if (!customer.password) {
    throw new Error(
      "This customer account is not registered yet."
    );
  }

  const passwordMatched =
    await bcrypt.compare(
      password,
      customer.password
    );

  if (!passwordMatched) {
    throw new Error(
      "Invalid email or password."
    );
  }

  const token = jwt.sign(

    {
      id: customer.id,
      email: customer.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

  return {

    token,

    customer: {

      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,

    },

  };

};

const getCustomerProfile = async (
  customerId
) => {

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode
    FROM customers
    WHERE id = $1;
    `,
    [customerId]
  );

  return result.rows[0];

};

module.exports = {

  registerCustomer,

  loginCustomer,

  getCustomerProfile,

};
