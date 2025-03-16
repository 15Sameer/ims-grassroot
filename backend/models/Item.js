const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  value: { type: Number },
});

module.exports = mongoose.model("Item", itemSchema);
