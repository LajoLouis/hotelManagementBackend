const Hotel = require("../models/hotelModel")
const {validateHotel} = require("../validator") 

exports.createHotel = async(req, res)=>{
    try {
        // Parse the location if it's sent as a string
        if (typeof req.body.location === 'string') {
        req.body.location = JSON.parse(req.body.location);
        }
        const {error} = validateHotel(req.body);
        if (error) {
            return res.json(error.details[0].message);
        }
        const hotel = new Hotel({
            name : req.body.name,
            address: req.body.address,
            city:req.body.city,
            state: req.body.state,
            country: req.body.country,
            image: req.file.path,
            phone: req.body.phone,
            email: req.body.email,
            facebook: req.body.facebook,
            instagram: req.body.instagram,
            whatsapp: req.body.whatsapp,
            location: req.body.location,
            description: req.body.description,
            rooms: req.body.rooms,
            amenities: req.body.amenities
        })

        const createdHotel = await hotel.save()
        res.json(createdHotel)
    } catch (error) {
        res.json({message: error.message})
    }
}

exports.addHotelRoom = async(req, res)=>{
    const hotelId = req.params.id
    const newRoom = req.body.newRoom
    try {
        const hotel = await Hotel.findById(hotelId)
        if (!hotel) {
            res.json("hotel not found")
        }else{
            hotel.rooms.push(newRoom)
            await hotel.save()
            res.json("completed")
        }
    } catch (error) {
        res.json(error)
    }
}

exports.getHotels = async (req, res) => {
    try {
      const allHotels = await Hotel.find()
      .populate("rooms", "roomName price capacity roomImage description available")
      .populate("amenities")
      res.json(allHotels);
    } catch (error) {
      res.json(error);
    }
  };