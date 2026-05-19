const mongoose = require("mongoose");


// Booking Form Fields:
// ● Driver Needed (Yes/No)
// ● Special Note
// ● Book Now Button

// Each booking card/table shows:
// ● Car Name
// ● Total Price
// ● Booking Date


const bookingSchema = new mongoose.Schema({
    carId: String,
    carName: String,
    carImage: String,
    pricePerDay: Number,
    totalPrice: Number,
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    driverNeeded: {
        type: Boolean,
        default: false,
    },
    specialNote: String,
    bookedBy: String,
});

module.exports = mongoose.model(
    "Booking",
    bookingSchema
);