const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const carRoutes = require("./routes/cars");
const bookingRoutes = require("./routes/bookings");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "drivefleet" });
    isConnected = true;
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌:", error);
    throw error;
  }
};

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(503).json({ error: "Service unavailable. Please try again later." });
  }
});

app.use("/cars", carRoutes);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => res.send("DriveFleet API is running 🚗"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;