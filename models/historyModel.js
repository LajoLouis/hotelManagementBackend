const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    room: {type:mongoose.Schema.Types.ObjectId, ref:"Room", required: true},
    orderId:{type:String, required:true},
    transactionId:{type:String, required:true},
    checkIn:{type:String, required:true , default:""},
    checkOut:{type:String, required:true , default:""},
    numberOfNights:{type:Number, required:true},
    occupants:{type:Number, required:true},
    totalCost:{type:Number, required:true},
    date:{type:Date, default:Date.now},
    paymentStatus:{type:String, default:"Pending"}
})

module.exports = mongoose.model("BookingHistory", historySchema)