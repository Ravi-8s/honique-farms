const pool = require("../config/database");

const getAllInventory = async () => {
  const result = await pool.query(`
    SELECT
      i.id,
      i.product_id AS "productId",
      p.name AS "productName",
      i.quantity,
      i.minimum_stock AS "minimumStock",
      i.location,
      i.updated_at AS "updatedAt"
    FROM inventory i
    JOIN products p
      ON i.product_id = p.id
    ORDER BY p.name;
  `);

  return result.rows;
};

const addInventory = async (inventory) => {
  const result = await pool.query(
    `
    INSERT INTO inventory
    (
      product_id,
      quantity,
      minimum_stock,
      location
    )
    VALUES
    ($1,$2,$3,$4)

    RETURNING
      id,
      product_id AS "productId",
      quantity,
      minimum_stock AS "minimumStock",
      location,
      updated_at AS "updatedAt";
    `,
    [
      inventory.productId,
      inventory.quantity,
      inventory.minimumStock,
      inventory.location,
    ]
  );

  return result.rows[0];
};

const updateInventory = async (id, inventory) => {
  const result = await pool.query(
    `
    UPDATE inventory
    SET
      product_id = $1,
      quantity = $2,
      minimum_stock = $3,
      location = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5

    RETURNING
      id,
      product_id AS "productId",
      quantity,
      minimum_stock AS "minimumStock",
      location,
      updated_at AS "updatedAt";
    `,
    [
      inventory.productId,
      inventory.quantity,
      inventory.minimumStock,
      inventory.location,
      id,
    ]
  );

  return result.rows[0];
};

const deleteInventory = async (id) => {
  await pool.query(
    `
    DELETE FROM inventory
    WHERE id = $1;
    `,
    [id]
  );
};

module.exports = {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
};
