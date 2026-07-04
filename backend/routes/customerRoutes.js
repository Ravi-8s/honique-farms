const express = require("express");

const router = express.Router();

const {
  getCustomers,
  createCustomer,
  editCustomer,
  removeCustomer,
} = require("../controllers/CustomerController");

router.get("/", getCustomers);

router.post("/", createCustomer);

router.put("/:id", editCustomer);

router.delete("/:id", removeCustomer);

module.exports = router;
