const mongoose = require("mongoose");
const crypto = require("crypto"); // Required for generating reset tokens

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "client", "volunteer1", "volunteer2", "volunteer3"],
      default: "client",
    },
    location: {
      type: String,
      enum: ["Indianapolis", "Washington"],
      required: true,
    },
    resetPasswordToken: { type: String, default: null }, // 🔹 Token for resetting password
    resetPasswordExpires: { type: Date, default: null }, // 🔹 Expiration time for token
  },
  { timestamps: true }
);

module.exports = {
  IndianapolisUser: mongoose.model(
    "User_Indianapolis",
    UserSchema,
    "users_indianapolis"
  ),
  WashingtonUser: mongoose.model(
    "User_Washington",
    UserSchema,
    "users_washington"
  ),
  AllUsers: mongoose.model("All_Users", UserSchema, "all_users"), // 🔹 Stores all users
};
