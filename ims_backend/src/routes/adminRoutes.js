const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middlewares/authMiddleware");
const {
  IndianapolisUser,
  WashingtonUser,
  AllUsers,
} = require("../models/User");

const router = express.Router();

const getUserModel = (location) => {
  return location === "Indianapolis" ? IndianapolisUser : WashingtonUser;
};

// =============================
// ✅ GET ALL USERS (Admin Only) - FIXED
// =============================
// @route   GET /api/admin/users/all
// @desc    Get all users from all locations
// @access  Private (Admin Only)
router.get("/users/all", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await AllUsers.find().select("-password"); // Exclude password for security
    res.json(users);
  } catch (err) {
    console.error("❌ Error fetching all users:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ GET USERS BY LOCATION (Admin Only)
// =============================
// @route   GET /api/admin/users/:location
// @desc    Get users from a specific location
// @access  Private (Admin Only)
router.get(
  "/users/:location",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { location } = req.params;

    if (!["Indianapolis", "Washington"].includes(location)) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const User = getUserModel(location);

    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      console.error("❌ Error fetching users:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// =============================
// ✅ UPDATE USER ROLE (Reflects in Both Collections)
// =============================
// @route   PUT /api/admin/update-role/:location/:id
// @desc    Admin can update a user's role based on location
// @access  Private (Admin Only)
router.put(
  "/update-role/:location/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { location } = req.params;

    if (!["Indianapolis", "Washington"].includes(location)) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const { role } = req.body;
    const validRoles = [
      "admin",
      "client",
      "volunteer1",
      "volunteer2",
      "volunteer3",
    ];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ msg: "Invalid role selection" });
    }

    const User = getUserModel(location);

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      user.role = role;
      await user.save();

      // Also update the user in `all_users`
      await AllUsers.findOneAndUpdate({ email: user.email }, { role });

      res.json({ msg: `User ${user.name} is now a ${role}.` });
    } catch (err) {
      console.error("❌ Error updating role:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// =============================
// ✅ DELETE A USER (Removes from Both Collections)
// =============================
// @route   DELETE /api/admin/delete-user/:location/:id
// @desc    Delete a user by ID and location
// @access  Private (Admin Only)
router.delete(
  "/delete-user/:location/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { location } = req.params;

    if (!["Indianapolis", "Washington"].includes(location)) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const User = getUserModel(location);

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      await user.deleteOne();
      await AllUsers.findOneAndDelete({ email: user.email });

      res.json({ msg: `User ${user.name} has been deleted.` });
    } catch (err) {
      console.error("❌ Error deleting user:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// =============================
// ✅ PROMOTE USER TO ADMIN (Admin Only)
// =============================
// @route   PUT /api/admin/make-admin/:location/:id
// @desc    Only an Admin can promote a user to Admin based on location
// @access  Private (Admin Only)
router.put(
  "/make-admin/:location/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { location } = req.params;

    if (!["Indianapolis", "Washington"].includes(location)) {
      return res.status(400).json({ msg: "Invalid location" });
    }

    const User = getUserModel(location);

    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      user.role = "admin";
      await user.save();

      // Also update the role in `all_users`
      await AllUsers.findOneAndUpdate({ email: user.email }, { role: "admin" });

      res.json({ msg: `User ${user.name} is now an Admin.` });
    } catch (err) {
      console.error("❌ Error updating role:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
