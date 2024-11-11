const {auth} = require("../middleware/auth")
const express = require("express")
const paymentController = require("../controllers/paymentController")

const router = express.Router()

router.post("/bookvialajo/payment/initiate", auth, paymentController.initiatePayment )
router.post("/bookvialajo/payment/verify", auth, paymentController.verifyPayment )


module.exports = router