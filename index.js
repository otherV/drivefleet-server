const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { dbName: "drivefleet" })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error ❌:", err));

app.get("/", (req, res) => {
  res.send("DriveFleet API is running 🚗");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});