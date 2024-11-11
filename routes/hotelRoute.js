const express = require("express")
const hotelController = require("../controllers/hotelController")
const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file, cb){
        cb(null, "uploads/")
    },
    filename: function(req,file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})
const router = express.Router()

router.post("/bookvialajo/createhotel", upload.single("image"), hotelController.createHotel)
router.post("/bookvialajo/addHotelRoom/:id", hotelController.addHotelRoom)
router.get("/bookvialajo/hotels", hotelController.getHotels)

module.exports = router