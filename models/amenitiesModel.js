const mongoose = require("mongoose")


const amenitiesSchema = new mongoose.Schema({
    name: {type: String, required:true},
})

module.exports = mongoose.model("Amenities", amenitiesSchema)