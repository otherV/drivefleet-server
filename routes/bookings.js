const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.get("/", async (req, res) => {
    const bookings = await Booking.find();
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