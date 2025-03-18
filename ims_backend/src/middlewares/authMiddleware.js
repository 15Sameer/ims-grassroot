const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    console.log("🔍 Received Token:", token); // Debugging log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded); // Debugging log

    req.user = decoded; // Attach user details to request
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Middleware for Admin Access
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    console.log("❌ Unauthorized: Admins only");
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  console.log("✅ Admin access granted");
  next();
};

// Middleware for Volunteer Access (Levels 1, 2, 3)
const volunteerMiddleware = (req, res, next) => {
  const allowedRoles = ["volunteer1", "volunteer2", "volunteer3"];
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteers only");
    return res.status(403).json({ msg: "Access denied: Volunteers only" });
  }
  console.log("✅ Volunteer access granted");
  next();
};

// Middleware for Client Access
const clientMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "client") {
    console.log("❌ Unauthorized: Clients only");
    return res.status(403).json({ msg: "Access denied: Clients only" });
  }
  console.log("✅ Client access granted");
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  volunteerMiddleware,
  clientMiddleware,
};
