const pool = require("../config/database");

const getAllProducts = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      category,
      weight,
      price,
      stock,
      description,
      image,
      is_active AS "isActive"
    FROM products
    WHERE is_active = TRUE
    ORDER BY id;
  `);

  return result.rows;
};

const addProduct = async (product) => {
  const result = await pool.query(
    `
    INSERT INTO products
    (name, category, weight, price, stock, description)

    VALUES
    ($1,$2,$3,$4,$5,$6)

    RETURNING
      id,
      name,
      category,
      weight,
      price,
      stock,
      description,
      image,
      is_active AS "isActive";
    `,
    [
      product.name,
      product.category,
      product.weight,
      product.price,
      product.stock,
      product.description,
    ]
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  addProduct,
};
