const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    phone: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {type:String, enum:["admin", "client"], default:"client"},
    image: {type:String},
    bookingHistory : [{type: mongoose.Schema.Types.ObjectId, ref: "BookingHistory"}]
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id:this._id, role: this.role}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
    return token;
}


module.exports = mongoose.model("User", userSchema)