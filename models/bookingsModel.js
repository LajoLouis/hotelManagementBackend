const mongoose = require("mongoose")

const bookingsSchema = new mongoose.Schema({
    room: {type: mongoose.Schema.Types.ObjectId, ref:"Room", required:true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    checkIn:{type:String, required:true , default:""},
    checkOut:{type:String, required:true , default:""},
    numberOfNights:{type:Number, required:true},
    occupants:{type:Number, required:true},
    totalCost:{type:Number, required:true},
    bookingDate:{type:String, required:true},
    paymentStatus:{type:Boolean, required:true, default:false}
})

module.exports = mongoose.model("Bookings", bookingsSchema)