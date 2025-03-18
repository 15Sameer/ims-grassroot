require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Default Route
app.get("/", (req, res) => {
  res.send("Grassroot Inventory API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//To handle authentication
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//To handle inventory routes
// const protectedRoutes = require("./routes/protectedRoutes.js");
// app.use("/api/protected", protectedRoutes);
try {
  const protectedRoutes = require("./routes/protectedRoutes.js");
  console.log("Protected routes imported successfully");
  app.use("/api/protected", protectedRoutes);
} catch (error) {
  console.error("Error loading protectedRoutes:", error);
}

//for admin to update roles
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
