const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../services/OrderService");

// =====================================================
// Create Order
// =====================================================

const createNewOrder = async (req, res) => {

  try {

    const order = await createOrder(req.body);

    res.status(201).json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });

  }

};

// =====================================================
// Get All Orders
// =====================================================

const fetchOrders = async (req, res) => {

  try {

    const orders = await getOrders();

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });

  }

};

// =====================================================
// Get Order By ID
// =====================================================

const fetchOrderById = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const order = await getOrderById(id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
    });

  }

};

// =====================================================
// Update Order Status
// =====================================================

const editOrderStatus = async (req, res) => {

  try {

    const id = Number(req.params.id);

    const { status } = req.body;

    const allowedStatus = [
      "Pending",
      "Packed",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(status)) {

      return res.status(400).json({
        message: "Invalid order status",
      });

    }

    const order = await updateOrderStatus(
      id,
      status
    );

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    res.json({
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update order status",
    });

  }

};

module.exports = {
  createNewOrder,
  fetchOrders,
  fetchOrderById,
  editOrderStatus,
};
