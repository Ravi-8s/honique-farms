const {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} = require("../services/InventoryService");

const getInventory = async (req, res) => {
  try {

    const inventory = await getAllInventory();

    res.json(inventory);

  } catch (error) {

    console.error("Error fetching inventory:", error);

    res.status(500).json({
      message: "Failed to fetch inventory",
    });

  }
};

const createInventory = async (req, res) => {
  try {

    const {
      productId,
      quantity,
      minimumStock,
      location,
    } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product is required",
      });
    }

    const inventory = await addInventory({
      productId,
      quantity,
      minimumStock,
      location,
    });

    res.status(201).json(inventory);

  } catch (error) {

    console.error("Error creating inventory:", error);

    res.status(500).json({
      message: "Failed to create inventory",
    });

  }
};

const editInventory = async (req, res) => {
  try {

    const inventory = await updateInventory(
      req.params.id,
      req.body
    );

    if (!inventory) {
      return res.status(404).json({
        message: "Inventory not found",
      });
    }

    res.json(inventory);

  } catch (error) {

    console.error("Error updating inventory:", error);

    res.status(500).json({
      message: "Failed to update inventory",
    });

  }
};

const removeInventory = async (req, res) => {
  try {

    await deleteInventory(req.params.id);

    res.json({
      message: "Inventory deleted successfully",
    });

  } catch (error) {

    console.error("Error deleting inventory:", error);

    res.status(500).json({
      message: "Failed to delete inventory",
    });

  }
};

module.exports = {
  getInventory,
  createInventory,
  editInventory,
  removeInventory,
};
