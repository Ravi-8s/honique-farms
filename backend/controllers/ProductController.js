const {
  getAllProducts,
  addProduct,
} = require("../services/ProductService");

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      weight,
      price,
      stock,
      description,
    } = req.body;

    // Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (!category || category.trim() === "") {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than zero",
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    const product = await addProduct({
      name,
      category,
      weight,
      price,
      stock,
      description,
    });

    res.status(201).json(product);

  } catch (error) {

    console.error("Error creating product:", error);

    res.status(500).json({
      message: "Failed to create product",
    });

  }
};

module.exports = {
  getProducts,
  createProduct,
};
