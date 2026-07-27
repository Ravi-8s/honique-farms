const {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
} = require("../services/CustomerAuthService");

const register = async (req, res) => {

  try {

    const result = await registerCustomer(req.body);

    res.status(201).json(result);

  } catch (error) {

    console.error("Customer Registration Error:", error);

    res.status(400).json({
      message: error.message,
    });

  }

};

const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await loginCustomer(
      email,
      password
    );

    res.json(result);

  } catch (error) {

    console.error("Customer Login Error:", error);

    res.status(401).json({
      message: error.message,
    });

  }

};

const profile = async (req, res) => {

  try {

    const customer = await getCustomerProfile(
      req.customer.id
    );

    res.json(customer);

  } catch (error) {

    console.error("Fetch Customer Profile Error:", error);

    res.status(500).json({
      message: "Failed to fetch profile.",
    });

  }

};

module.exports = {

  register,

  login,

  profile,

};
