const express = require("express");
const {
  authMiddleware,
  adminMiddleware,
  volunteerMiddleware,
  clientMiddleware,
} = require("../middlewares/authMiddleware");

const router = express.Router();

// Public route
router.get("/public", (req, res) => {
  res.json({ msg: "This is a public route" });
});

// Protected route for all logged-in users
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: `Hello ${req.user.id}, you have access!` });
});

// Admin-only route
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ msg: "Welcome Admin! You have admin access." });
});

// Volunteer-only route
router.get("/volunteer", authMiddleware, volunteerMiddleware, (req, res) => {
  res.json({ msg: "Welcome Volunteer! You have access." });
});

// Client-only route
router.get("/client", authMiddleware, clientMiddleware, (req, res) => {
  res.json({ msg: "Welcome Client! You have access." });
});

module.exports = router;
