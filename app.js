const express = require('express');
const mongoose = require('mongoose');
const Booking = require('./models/Booking');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect('mongodb://localhost:27017/restaurant')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/booking', (req, res) => {
    res.render('booking');
});

app.get('/status', async (req, res) => {
    const bookings = await Booking.find();
    res.render('status', { bookings });
});

// Create Booking
app.post('/book', async (req, res) => {
    const { name, date, time, guests } = req.body;
    await Booking.create({ name, date, time, guests });
    res.redirect('/status');
});

// Delete Booking
app.post('/delete/:id', async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.redirect('/status');
});

// Start Server
app.listen(3000, () => console.log('Server running on port 3000'));
