const express = require("express")
const authController = require("../controllers/authController")
const {auth} = require("../middleware/auth")
const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file, cb){
        cb(null, "uploads/")
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({storage:storage})
const router = express.Router()

router.post("/bookvialajo/register",upload.single("image"), authController.register)
router.post("/bookvialajo/login", authController.login)
router.get("/bookvialajo/userProfile",auth, authController.getUserProfile)
router.patch("/bookvialajo/editUserProfile",auth, authController.editUserProfile)

module.exports = router