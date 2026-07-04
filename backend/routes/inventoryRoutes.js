const express = require("express");

const router = express.Router();

const {
  getInventory,
  createInventory,
  editInventory,
  removeInventory,
} = require("../controllers/InventoryController");

router.get("/", getInventory);

router.post("/", createInventory);

router.put("/:id", editInventory);

router.delete("/:id", removeInventory);

module.exports = router;
