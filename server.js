const express = require("express")
const connectDB = require("./config/db")
const app = express()
const dotenv = require("dotenv")
const hotelRoute = require("./routes/hotelRoute")
const roomRoute = require("./routes/roomRoute")
const amenitiesRoute = require("./routes/amenitiesRoute")
const authRoute = require("./routes/authRoute")
const bookingsRoute = require("./routes/bookingsRoute")
const paymentRoute = require("./routes/paymentRoute")
const cors = require("cors")

connectDB()
dotenv.config()

app.use(
    cors({
        origin: "http://localhost:5173",
        allowedHeaders : ["Content-Type", "Authorization", "auth-token"],
        methods : ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials : true
    })
)

app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use("/", hotelRoute)
app.use("/", roomRoute)
app.use("/", amenitiesRoute)
app.use("/", authRoute)
app.use("/", bookingsRoute)
app.use("/", paymentRoute)


const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`You are listening on port ${port}`))