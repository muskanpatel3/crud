const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    guests: Number
});

module.exports = mongoose.model('Booking', bookingSchema);
