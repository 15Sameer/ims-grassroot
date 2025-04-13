const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("🔍 Received Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded);

    req.user = decoded;
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

// Middleware for All Volunteers Access (1 to 5)
const volunteerMiddleware = (req, res, next) => {
  const allowedRoles = [
    "volunteer1",
    "volunteer2",
    "volunteer3",
    "volunteer4",
    "volunteer5",
  ];
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteers only");
    return res.status(403).json({ msg: "Access denied: Volunteers only" });
  }
  console.log(`✅ Volunteer (${req.user.role}) access granted`);
  next();
};

// Individual volunteer middleware (Volunteer 5 has access to all)
const volunteer1Middleware = (req, res, next) => {
  if (!req.user || !["volunteer1", "volunteer5"].includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteer 1 only");
    return res.status(403).json({ msg: "Access denied: Volunteer 1 only" });
  }
  console.log("✅ Volunteer 1 access granted");
  next();
};

const volunteer2Middleware = (req, res, next) => {
  if (!req.user || !["volunteer2", "volunteer5"].includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteer 2 only");
    return res.status(403).json({ msg: "Access denied: Volunteer 2 only" });
  }
  console.log("✅ Volunteer 2 access granted");
  next();
};

const volunteer3Middleware = (req, res, next) => {
  if (!req.user || !["volunteer3", "volunteer5"].includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteer 3 only");
    return res.status(403).json({ msg: "Access denied: Volunteer 3 only" });
  }
  console.log("✅ Volunteer 3 access granted");
  next();
};

const volunteer4Middleware = (req, res, next) => {
  if (!req.user || !["volunteer4", "volunteer5"].includes(req.user.role)) {
    console.log("❌ Unauthorized: Volunteer 4 only");
    return res.status(403).json({ msg: "Access denied: Volunteer 4 only" });
  }
  console.log("✅ Volunteer 4 access granted");
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
  volunteer1Middleware,
  volunteer2Middleware,
  volunteer3Middleware,
  volunteer4Middleware,
  clientMiddleware,
};
