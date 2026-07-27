const pool = require("../config/database");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

// =====================================================
// Admin Login
// =====================================================

const loginAdmin = async (
  username,
  password
) => {

  const result = await pool.query(
    `
    SELECT
      id,
      username,
      password
    FROM admins
    WHERE username = $1
    `,
    [username]
  );

  if (result.rows.length === 0) {

    throw new Error(
      "Invalid username"
    );

  }

  const admin =
    result.rows[0];

  const validPassword =
    await bcrypt.compare(
      password,
      admin.password
    );

  if (!validPassword) {

    throw new Error(
      "Invalid password"
    );

  }

  const token =
    jwt.sign(

      {

        id: admin.id,

        username:
          admin.username,

      },

      process.env.JWT_SECRET,

      {

        expiresIn: "24h",

      }

    );

  return {

    token,

    admin: {

      id: admin.id,

      username:
        admin.username,

    },

  };

};

module.exports = {

  loginAdmin,

};
