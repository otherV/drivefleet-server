const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, async (req, res) => {
    const { userId } = req.query;
    const query = userId ? { bookedBy: userId } : {};
    const bookings = await Booking.find(query).sort({ bookingDate: -1 });
    res.json(bookings);
});

router.post("/", verifyToken, async (req, res) => {
    const booking = new Booking(req.body);
    const result = await booking.save();

    await Car.findByIdAndUpdate(
        req.body.carId,
        { $inc: { bookingCount: 1 } }
    );

    res.json(result);
});

router.delete("/:id", verifyToken, async (req, res) => {
    const result = await Booking.findByIdAndDelete(req.params.id);
    res.json(result);
});

module.exports = router;