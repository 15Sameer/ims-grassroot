const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { IndianaUser, WashingtonUser, AllUsers } = require("../models/User");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// ✅ Updated: Handle case and whitespace in location
const getUserModel = (location) => {
  if (!location) return null;
  const normalized = location.trim().toLowerCase();
  if (normalized === "indiana") return IndianaUser;
  if (normalized === "washington") return WashingtonUser;
  return null;
};

// =============================
// ✅ FORGOT PASSWORD
// =============================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await AllUsers.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click this link to reset your password: ${resetURL}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "Password reset link sent to your email." });
  } catch (err) {
    console.error("❌ Error sending reset email:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ RESET PASSWORD
// =============================
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await AllUsers.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ msg: "Password has been reset successfully." });
  } catch (err) {
    console.error("❌ Error resetting password:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// =============================
// ✅ REGISTER
// =============================
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn([
        "admin",
        "client",
        "volunteer1",
        "volunteer2",
        "volunteer3",
        "volunteer4",
        "volunteer5",
      ])
      .withMessage("Invalid role selection"),
    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .custom((val) =>
        ["indiana", "washington"].includes(val.trim().toLowerCase())
      )
      .withMessage("Invalid location selection"),
  ],
  authMiddleware,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password, role, location } = req.body;
    const normalizedLocation = location.trim().toLowerCase();
    const User = getUserModel(normalizedLocation);

    if (!User) {
      return res.status(400).json({ msg: "Invalid location specified" });
    }

    try {
      let userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let assignedRole = "client";
      if (req.user && req.user.role === "admin" && role) {
        assignedRole = role;
      }

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role: assignedRole,
        location: normalizedLocation,
      });
      await user.save();

      const allUser = new AllUsers({
        name,
        email,
        password: hashedPassword,
        role: assignedRole,
        location: normalizedLocation,
      });
      await allUser.save();

      const token = jwt.sign(
        { id: user._id, role: user.role, location: user.location },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(201).json({
        msg: "User registered successfully!",
        token,
        user: {
          id: user._id,
          name,
          email,
          role: user.role,
          location: user.location,
        },
      });
    } catch (err) {
      console.error("❌ Error during registration:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// =============================
// ✅ LOGIN
// =============================
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password is required"),
    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .custom((val) =>
        ["indiana", "washington"].includes(val.trim().toLowerCase())
      )
      .withMessage("Invalid location selection"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { email, password, location } = req.body;
    const normalizedLocation = location.trim().toLowerCase();
    const User = getUserModel(normalizedLocation);

    if (!User) {
      return res.status(400).json({ msg: "Invalid location specified" });
    }

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role, location: user.location },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        msg: "Login successful!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          location: user.location,
        },
      });
    } catch (err) {
      console.error("❌ Error in login:", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

module.exports = router;
