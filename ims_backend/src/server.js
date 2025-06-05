require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Connect to MongoDB
connectDB();

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Grassroot Inventory API is running...");
});

// =============================
// ✅ Route Imports
// =============================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

// Optional: Load Protected Routes Safely
try {
  const protectedRoutes = require("./routes/protectedRoutes.js");
  console.log("✅ Protected routes imported successfully");
  app.use("/api/protected", protectedRoutes);
} catch (error) {
  console.error("❌ Error loading protectedRoutes:", error);
}

// =============================
// ✅ Register Routes
// =============================
app.use("/api/auth", authRoutes); // Authentication
app.use("/api/admin", adminRoutes); // Admin Management
app.use("/api/inventory", inventoryRoutes); // Inventory Management

// =============================
// ✅ Error Handling Middleware
// =============================
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
