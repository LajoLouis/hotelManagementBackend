const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  image: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  facebook: { type: String, default:"" },
  instagram: { type: String, default:"" },
  whatsapp: { type: String, default:"" },
  location: {
    type: {
      type: String, 
      enum: ['Point'],  
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: { type: String, required: true },
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  amenities: [{type:mongoose.Schema.Types.ObjectId, ref: "Amenities"}]
});

module.exports = mongoose.model("Hotel", hotelSchema);
