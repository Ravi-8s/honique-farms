require("dotenv").config({
  path: ".env.docker",
});

const bcrypt = require("bcrypt");

const pool = require("../config/database");

async function seedAdmin() {

  try {

    const username =
      process.env.ADMIN_USERNAME;

    const password =
      process.env.ADMIN_PASSWORD;

    const existing =
      await pool.query(
        `
        SELECT id
        FROM admins
        WHERE username = $1
        `,
        [username]
      );

    if (existing.rows.length > 0) {

      console.log(
        "✅ Admin already exists."
      );

      process.exit(0);

    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await pool.query(
      `
      INSERT INTO admins
      (
        username,
        password
      )
      VALUES
      (
        $1,
        $2
      )
      `,
      [
        username,
        hashedPassword,
      ]
    );

    console.log(
      "✅ Admin created successfully."
    );

    process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

}

seedAdmin();
