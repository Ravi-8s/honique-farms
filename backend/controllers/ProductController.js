const {
  getAllProducts,
} = require("../services/ProductService");

const getProducts = (req, res) => {
  const products = getAllProducts();

  res.json(products);
};

module.exports = {
  getProducts,
};
