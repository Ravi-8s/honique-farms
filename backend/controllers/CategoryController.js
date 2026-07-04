const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../services/CategoryService");

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.json(categories);

  } catch (error) {

    console.error("Error fetching categories:", error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });

  }
};

const createCategory = async (req, res) => {
  try {

    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const category = await addCategory({
      name,
      description,
    });

    res.status(201).json(category);

  } catch (error) {

    console.error("Error creating category:", error);

    res.status(500).json({
      message: "Failed to create category",
    });

  }
};

const editCategory = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const category = await updateCategory(id, req.body);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json(category);

  } catch (error) {

    console.error("Error updating category:", error);

    res.status(500).json({
      message: "Failed to update category",
    });

  }
};

const removeCategory = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const category = await deleteCategory(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.json({
      message: "Category deleted successfully",
    });

  } catch (error) {

    console.error("Error deleting category:", error);

    res.status(500).json({
      message: "Failed to delete category",
    });

  }
};

module.exports = {
  getCategories,
  createCategory,
  editCategory,
  removeCategory,
};
