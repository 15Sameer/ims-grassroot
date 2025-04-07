const jwt = require("jsonwebtoken");
const { IndianaUser, WashingtonUser, AllUsers } = require("../models/User");

// Helper to choose the right model based on location
const getUserModelByLocation = (location) => {
  if (location === "indiana") return IndianaUser;
  if (location === "washington") return WashingtonUser;
  throw new Error("Invalid location");
};

const register = async (req, res) => {
  try {
    const { name, email, password, role, location } = req.body;
    const UserModel = getUserModelByLocation(location);

    // Check if user already exists in this location
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new UserModel({ name, email, password, role, location });
    await newUser.save();

    // Also add to central all_users collection
    await new AllUsers({ name, email, password, role, location }).save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, location } = req.body;
    const UserModel = getUserModelByLocation(location);

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, location: user.location },
      process.env.JWT_SECRET || "yoursecret",
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register, login };
