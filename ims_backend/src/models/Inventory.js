const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['food', 'clothing', 'medical', 'electronics', 'other']
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true,
      enum: ['piece', 'kg', 'liter', 'box', 'pack']
    },
    location: {
      type: String,
      required: true,
      enum: ['indiana', 'washington']
    },
    minimumStock: {
      type: Number,
      required: true,
      min: 0
    },
    supplier: {
      name: String,
      contact: String,
      email: String
    },
    lastRestocked: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock'
    },
    notes: String
  },
  { timestamps: true }
);

// Update status based on quantity
InventorySchema.pre('save', function(next) {
  if (this.quantity <= 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.minimumStock) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

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
