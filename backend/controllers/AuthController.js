const {
  loginAdmin,
} = require("../services/AuthService");

// =====================================================
// Admin Login
// =====================================================

const login = async (
  req,
  res
) => {

  try {

    const {
      username,
      password,
    } = req.body;

    const result =
      await loginAdmin(
        username,
        password
      );

    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(401).json({

      message:
        error.message,

    });

  }

};

module.exports = {

  login,

};
