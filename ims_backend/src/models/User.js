const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: [
      "admin",
      "client",
      "volunteer1",
      "volunteer2",
      "volunteer3",
      "volunteer4",
      "volunteer5",
    ],
    default: "client",
  },
  location: {
    type: String,
    enum: ["indiana", "washington"],
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

// Hash password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create different models
const IndianaUser = mongoose.model("IndianaUser", UserSchema, "users_indiana");
const WashingtonUser = mongoose.model(
  "WashingtonUser",
  UserSchema,
  "users_washington"
);
const AllUsers = mongoose.model("AllUsers", UserSchema, "all_users");

module.exports = { IndianaUser, WashingtonUser, AllUsers };
