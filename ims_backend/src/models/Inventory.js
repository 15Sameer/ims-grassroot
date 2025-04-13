const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Item name
    description: { type: String }, // Item description
    quantity: { type: Number, required: true, min: 0 }, // Available stock
    category: { type: String, required: true }, // Item category (e.g., clothing, food)
    location: {
      type: String,
      enum: ["indiana", "washington"], // Ensure lowercase
      required: true,
    }, // Location-specific inventory
  },
  { timestamps: true } // Adds createdAt & updatedAt
);

console.log(
  "Inventory Schema Location Enum:",
  InventorySchema.path("location").enumValues
);

module.exports = {
  IndianaInventory: mongoose.model(
    "Inventory_Indiana",
    InventorySchema,
    "inventory_indiana" // ✅ Fixed collection name
  ),
  WashingtonInventory: mongoose.model(
    "Inventory_Washington",
    InventorySchema,
    "inventory_washington"
  ),
  AllInventory: mongoose.model(
    "All_Inventory",
    InventorySchema,
    "all_inventory"
  ),
};
