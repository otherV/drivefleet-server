const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
    const { userId } = req.query;
    const query = userId ? { bookedBy: userId } : {};
    const bookings = await Booking.find(query).sort({ bookingDate: -1 });
    res.json(bookings);
});

router.post("/", async (req, res) => {
    const booking = new Booking(req.body);
    const result = await booking.save();
    res.json(result);
});

router.delete("/:id", async (req, res) => {
    const result = await Booking.findByIdAndDelete(
        req.params.id
    );
    res.json(result);
});

module.exports = router;