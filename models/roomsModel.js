const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
    hotel : {type: mongoose.Schema.Types.ObjectId, ref:"Hotel", required:true},
    roomName : {type:String, required:true},
    roomImage:{type:String, required:true},
    capacity: {type: Number, required:true},
    price: {type: Number, required:true},
    available:{type: Boolean, default:true},
    description: {type: String}
})

module.exports = mongoose.model("Room", roomSchema)