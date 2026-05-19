const mongoose = require("mongoose");

// ● Car Name
// ● Daily Rent Price
// ● Car Type (SUV / Sedan / Hatchback / Luxury / etc.)
// ● Image URL (imgbb/postimage)
// ● Seat Capacity
// ● Pickup Location
// ● Description
// ● Availability Status

const carSchema = new mongoose.Schema({
    name: String,
    price: Number,
    type: String,
    image: String,
    seats: Number,
    location: String,
    description: String,
    availability: {
        type: Boolean,
        default: true,
    },
    bookingCount: {
        type: Number,
        default: 0,
    },
    addedBy: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model(
    "Car",
    carSchema
);