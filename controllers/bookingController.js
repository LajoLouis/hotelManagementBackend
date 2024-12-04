const Bookings = require("../models/bookingsModel");
const User = require('../models/userModel')


exports.makeBooking = async (req, res) => {
    const { room, checkIn, checkOut, numberOfNights, totalCost, occupants, bookingDate, paymentStatus } = req.body;
    const user = req.user.id;

    try {
        if (!checkIn || !checkOut) {
            return res.status(400).json("Input checkIn and CheckOut date");
        }
        if (!room) {
            return res.json("please select a room")
        }

        const booking = new Bookings({ room, user, checkIn, checkOut, numberOfNights, totalCost, occupants, bookingDate, paymentStatus });
        const newBooking = await booking.save();
        
        
        res.status(201).json(newBooking);

        
    } catch (error) {
        console.error("Error while creating booking: ", error);
        res.status(500).json({ message: "Server error while creating booking." });
    }
}

exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Bookings.find({ user: req.user.id })
            .populate("room", "roomName roomImage")
            .populate({
                path: "room",
                populate: { path: "hotel", select: "name address" }
            });

        if (!bookings.length) {
            return res.status(404).json("No booking yet");
        }

        return res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.deleteBooking = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const booking = await Bookings.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json("Booking does not exist anymore");
        } else {
            res.status(200).json(booking);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
