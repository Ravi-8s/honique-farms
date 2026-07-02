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

const updateProduct = async (id, product) => {
  const result = await pool.query(
    `
    UPDATE products
    SET
      name = $1,
      category = $2,
      weight = $3,
      price = $4,
      stock = $5,
      description = $6
    WHERE id = $7

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
      id,
    ]
  );

  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query(
    `
    UPDATE products
    SET is_active = FALSE
    WHERE id = $1

    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
