const express = require("express");

const router = express.Router();

const {
  createNewOrder,
  fetchOrders,
  fetchOrderById,
  editOrderStatus,
} = require("../controllers/OrderController");

// =====================================================
// Order APIs
// =====================================================

router.get("/", fetchOrders);

router.get("/:id", fetchOrderById);

router.post("/", createNewOrder);

// =====================================================
// Update Order Status
// =====================================================

router.put(
  "/:id/status",
  editOrderStatus
);

module.exports = router;
