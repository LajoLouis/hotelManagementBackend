const roomController = require("../controllers/roomController")
const express = require("express")
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

router.post("/bookvialajo/createRoom", upload.single("roomImage"), roomController.createRoom)
router.post("/bookvialajo/updateRoom", roomController.updateRoom)

module.exports = router