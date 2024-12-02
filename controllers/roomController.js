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

exports.updateRoom = async (req, res) => {
    const { roomId } = req.body; // Destructure roomId from the request body
    try {
      // Update the room and ensure the updated document is returned
      const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        { available: true }, // Set available to true
        { new: true }        // Return the updated document
      );
  
      // Check if the room was found and updated
      if (!updatedRoom) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Respond with the updated room data
      res.status(200).json({
        message: "Room updated successfully",
        room: updatedRoom,
      });
    } catch (error) {
      // Handle errors and respond with appropriate status and message
      console.error("Error updating room:", error);
      res.status(500).json({ message: "An error occurred while updating the room" });
    }
  };
  

