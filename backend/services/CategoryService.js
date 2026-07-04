const pool = require("../config/database");

const getAllCategories = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      is_active AS "isActive"
    FROM categories
    WHERE is_active = TRUE
    ORDER BY id;
  `);

  return result.rows;
};

const addCategory = async (category) => {
  const result = await pool.query(
    `
    INSERT INTO categories
    (name, description)

    VALUES
    ($1, $2)

    RETURNING
      id,
      name,
      description,
      is_active AS "isActive";
    `,
    [
      category.name,
      category.description,
    ]
  );

  return result.rows[0];
};

const updateCategory = async (id, category) => {
  const result = await pool.query(
    `
    UPDATE categories
    SET
      name = $1,
      description = $2
    WHERE id = $3

    RETURNING
      id,
      name,
      description,
      is_active AS "isActive";
    `,
    [
      category.name,
      category.description,
      id,
    ]
  );

  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await pool.query(
    `
    UPDATE categories
    SET is_active = FALSE
    WHERE id = $1

    RETURNING id;
    `,
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
