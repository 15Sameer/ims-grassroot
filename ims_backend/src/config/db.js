const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true, // Enable TLS
      tlsAllowInvalidCertificates: true, // Ignore certificate errors
      serverSelectionTimeoutMS: 5000, // Reduce timeout
    });
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
