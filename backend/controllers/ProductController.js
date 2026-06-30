const {
  getAllProducts,
  addProduct,
} = require("../services/ProductService");

const getProducts = (req, res) => {
  res.json(getAllProducts());
};

const createProduct = (req, res) => {
  const product = addProduct(req.body);

  res.status(201).json(product);
};

module.exports = {
  getProducts,
  createProduct,
};
