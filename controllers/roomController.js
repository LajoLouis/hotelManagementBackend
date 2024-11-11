const Room = require("../models/roomsModel")


exports.createRoom = async(req, res,)=>{
    try {
        const room = new Room({
            hotel: req.body.hotel,
            roomName: req.body.roomName,
            roomImage: req.file.path,
            capacity: req.body.capacity,
            price: req.body.price,
            description: req.body.description
        })
    
        const newRoom = await room.save()
        res.json(newRoom)
    } catch (error) {
        res.json(error)
    }
}

