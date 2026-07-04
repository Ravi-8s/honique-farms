const {
  createOrder,
  getOrders,
} = require("../services/OrderService");

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

module.exports = {
  createNewOrder,
  fetchOrders,
};
