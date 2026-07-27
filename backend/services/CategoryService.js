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

  // Check whether a category with the same name already exists
  const existingCategory = await pool.query(
    `
    SELECT
      id,
      is_active
    FROM categories
    WHERE LOWER(TRIM(name)) = LOWER(TRIM($1));
    `,
    [category.name]
  );

  // Category already exists
  if (existingCategory.rows.length > 0) {

    const existing = existingCategory.rows[0];

    // Already active
    if (existing.is_active) {

      throw new Error("CATEGORY_ALREADY_EXISTS");

    }

    // Restore inactive category
    const restoredCategory = await pool.query(
      `
      UPDATE categories
      SET
        is_active = TRUE,
        description = $1
      WHERE id = $2

      RETURNING
        id,
        name,
        description,
        is_active AS "isActive";
      `,
      [
        category.description,
        existing.id,
      ]
    );

    return restoredCategory.rows[0];

  }

  // Create a brand-new category
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
      category.name.trim(),
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
