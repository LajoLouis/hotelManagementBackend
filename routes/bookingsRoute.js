const bookingController = require("../controllers/bookingController")
const express = require("express")
const { auth } = require("../middleware/auth")


const router = express.Router()

router.post("/bookvialajo/makebooking", auth , bookingController.makeBooking)
router.get("/bookvialajo/getbooking", auth , bookingController.getUserBookings)
router.post("/bookvialajo/deletebooking", auth, bookingController.deleteBooking)

module.exports = router