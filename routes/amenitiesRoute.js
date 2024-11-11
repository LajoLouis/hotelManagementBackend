const express = require("express")
const amenitiesController = require("../controllers/amenitiesController")

const router = express.Router()

router.post("/bookvialajo/createamenities", amenitiesController.createAmenities)

module.exports = router