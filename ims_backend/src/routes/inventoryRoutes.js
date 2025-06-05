const express = require("express");
const mongoose = require("mongoose");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const {
  IndianaInventory,
  WashingtonInventory,
  AllInventory,
} = require("../models/Inventory");
const { body } = require('express-validator');
const { auth, checkRole } = require('../middlewares/auth');
const {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  updateStock,
  getLowStockItems
} = require('../controllers/inventoryController');

const router = express.Router();

// 🔧 Improved helper function for model selection
const getInventoryModel = (location) => {
  switch ((location || "").toLowerCase()) {
    case "indiana":
      return IndianaInventory;
    case "washington":
      return WashingtonInventory;
    default:
      return null;
  }
};

// Validation middleware
const itemValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').isIn(['food', 'clothing', 'medical', 'electronics', 'other']).withMessage('Invalid category'),
  body('quantity').isNumeric().withMessage('Quantity must be a number'),
  body('unit').isIn(['piece', 'kg', 'liter', 'box', 'pack']).withMessage('Invalid unit'),
  body('location').isIn(['indiana', 'washington']).withMessage('Invalid location'),
  body('minimumStock').isNumeric().withMessage('Minimum stock must be a number')
];

// =============================
// ✅ ADD NEW INVENTORY ITEM (Admin Only)
// =============================
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let { name, description, quantity, category, location } = req.body;

    if (!["indiana", "washington"].includes(location.toLowerCase())) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const locationLower = location.toLowerCase();
    const Inventory = getInventoryModel(locationLower);

    const newItem = new Inventory({
      name,
      description,
      quantity,
      category,
      location: locationLower,
    });
    await newItem.save();

    const allItem = new AllInventory({
      _id: newItem._id,
      name,
      description,
      quantity,
      category,
      location: locationLower,
    });
    await allItem.save();

    res
      .status(201)
      .json({ msg: "Inventory item added successfully", item: newItem });
  } catch (err) {
    console.error("❌ Error adding inventory item:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ GET ALL INVENTORY (Admin & Volunteers)
// =============================
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const inventory = await AllInventory.find();
    res.json(inventory);
  } catch (err) {
    console.error("❌ Error fetching inventory:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ GET INVENTORY BY LOCATION
// =============================
router.get("/:location", authMiddleware, async (req, res) => {
  const location = req.params.location.toLowerCase();

  if (!["indiana", "washington"].includes(location)) {
    return res.status(400).json({ msg: "Invalid location" });
  }

  const Inventory = getInventoryModel(location);

  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    console.error("❌ Error fetching inventory by location:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ UPDATE INVENTORY ITEM (Admin Only)
// =============================
router.put("/update/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    let { name, description, quantity, category, location } = req.body;

    if (!["indiana", "washington"].includes(location.toLowerCase())) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid item ID format" });
    }

    const locationLower = location.toLowerCase();
    const Inventory = getInventoryModel(locationLower);

    const allInventoryItem = await AllInventory.findOne({ _id: req.params.id });
    if (!allInventoryItem) {
      return res.status(404).json({ msg: "Item not found in all_inventory" });
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { name, description, quantity, category, location: locationLower },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ msg: "Inventory item not found" });
    }

    await AllInventory.findByIdAndUpdate(
      allInventoryItem._id,
      { name, description, quantity, category, location: locationLower },
      { new: true }
    );

    res.json({ msg: "Inventory item updated successfully", item: updatedItem });
  } catch (err) {
    console.error("❌ Error updating inventory:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ DELETE INVENTORY ITEM (Admin Only)
// =============================
router.delete(
  "/:location/delete/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const location = req.params.location.toLowerCase();
      const id = req.params.id;

      if (!["indiana", "washington"].includes(location)) {
        return res.status(400).json({ msg: "Invalid location" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Invalid item ID format" });
      }

      const Inventory = getInventoryModel(location);
      const item = await Inventory.findById(id);

      if (!item) {
        return res.status(404).json({ msg: "Inventory item not found" });
      }

      await item.deleteOne();
      await AllInventory.findByIdAndDelete(id);

      res.json({ msg: `Inventory item "${item.name}" has been deleted.` });
    } catch (err) {
      console.error("❌ Error deleting inventory:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// Routes
router.get('/', auth, getAllItems);
router.get('/low-stock', auth, getLowStockItems);
router.get('/:id', auth, getItem);
router.post('/', [auth, checkRole(['admin', 'manager']), ...itemValidation], createItem);
router.put('/:id', [auth, checkRole(['admin', 'manager']), ...itemValidation], updateItem);
router.delete('/:id', [auth, checkRole(['admin'])], deleteItem);
router.patch('/:id/stock', [auth, checkRole(['admin', 'manager'])], updateStock);

module.exports = router;
