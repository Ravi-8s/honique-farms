const express = require("express");

const router = express.Router();

const {
  register,
  login,
  profile,
} = require("../controllers/CustomerAuthController");

const customerAuthMiddleware = require("../middleware/customerAuthMiddleware");

router.post("/register", register);

router.post("/login", login);

router.get(
  "/profile",
  customerAuthMiddleware,
  profile
);

module.exports = router;
