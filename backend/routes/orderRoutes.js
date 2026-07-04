const express = require("express");

const router = express.Router();

const {
  createNewOrder,
  fetchOrders,
} = require("../controllers/OrderController");

router.get("/", fetchOrders);

router.post("/", createNewOrder);

module.exports = router;
