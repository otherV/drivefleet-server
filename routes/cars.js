const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const verifyToken = require("../middleware/verifyToken");

router.get("/", async (req, res) => {
    const { userId } = req.query;
    const query = userId ? { addedBy: userId } : {};
    const cars = await Car.find(query).sort({ createdAt: -1 });
    res.json(cars);
});

router.get("/:id", async (req, res) => {
    const car = await Car.findById(req.params.id);
    res.json(car);
});

router.post("/", verifyToken, async (req, res) => {
    const car = new Car(req.body);
    const result = await car.save();
    res.json(result);
});

router.put("/:id", verifyToken, async (req, res) => {
    const result = await Car.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after" } // returns the updated document, "new" option is deprecated
    );
    res.json(result);
});

router.delete("/:id", verifyToken, async (req, res) => {
    const result = await Car.findByIdAndDelete(req.params.id);
    res.json(result);
});

module.exports = router;