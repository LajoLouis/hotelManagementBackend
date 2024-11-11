const Amenities = require("../models/amenitiesModel")

exports.createAmenities = async(req, res)=>{
    try {
        const amenities = new Amenities({
            name : req.body.name
        })

        await amenities.save()
        res.json(amenities)
    } catch (error) {
        res.json({message: error.message})
    } 
}