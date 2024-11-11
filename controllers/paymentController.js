const {v4 : uuidv4} = require("uuid")
const Bookings = require("../models/bookingsModel")
const BookingHistory = require("../models/historyModel")


const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

exports.initiatePayment = async (req,res) => {
    const user = req.user
    const { bookingId, amount, currency } = req.body

    try {
        const booking = await Bookings.findById(bookingId).populate("room", "roomName")
        if (!booking) {
            res.json("Booking no longer exists")
        }

        const orderId = uuidv4()
        const paymentData = {
            tx_ref : orderId,
            amount,
            currency,
            redirect_url: "http://localhost:5173/bookingconfirmed",
            customer : {
                email : user.email,
                name: `${user.firstName} ${user.lastName}`
            },
            customizations:{
                title: "BookViaLajo Payment",
                description: `Payment for ${booking.room.roomName}`
            },
            meta: {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                bookingId
            }

        }
        const response = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${FLW_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

        const data = await response.json()
        if (data.status === "success") {
            res.json({link: data.data.link, orderId})
        }else {
            res.json("payment initiation failed")
        }

    } catch (error) {
        console.log(error);
        
        
    }
}

exports.verifyPayment = async (req,res) => {
    const { transaction_id, orderId } = req.body;
  // const { user } = req.user.id;

  try {
    
    const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
          },
        }
      );
  
    const data = await response.json();
    const bookingId = data.data.meta.bookingId
    if (data.status === "success") {
        const booking = await Bookings.findById(bookingId)
        // .populate({path:"room", select: "roomImage roomName", populate:{
        //     path: "hotel",
        //     select: "name address phone"
        // }})

        const history = new BookingHistory({
            user : req.user.id,
            room: booking.room,
            orderId:orderId,
            transactionId: transaction_id,
            checkIn: booking.checkIn,
            checkOut:booking.checkOut,
            numberOfNights:booking.numberOfNights,
            occupants:booking.occupants,
            totalCost:booking.totalCost,
            paymentStatus: "Paid"

        })

        await history.save()
        await Bookings.findByIdAndDelete(bookingId)

        res.json({msg:"Payment successful", history})
    } else {
        res.json({ msg: "Payment verification Failed" });
    }


  } catch (error) {
    console.log(error);
    
  }
}

// exports.verifyPayment = async (req, res) => {
//     const { transaction_id, orderId } = req.body;
//     // const { user } = req.user.id;
  
//     try {
//       const response = await fetch(
//         `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${FLW_SECRET_KEY}`,
//           },
//         }
//       );
  
//       const data = await response.json();
  
//       if (data.status === "success") {
//         const cart = await Cart.findOne({ user: req.user.id }).populate(
//           "products.product"
//         );
  
//         const order = new Order({
//           user: req.user.id,
//           orderId,
//           firstName: data.data.meta.firstName,
//           lastName: data.data.meta.lastName,
//           phone: data.data.meta.phone,
//           address: data.data.meta.address,
//           products: cart.products,
//           amount: data.data.amount,
//           status: "completed",
//           transactionId: transaction_id,
//         });
  
//         await order.save();
//         await Cart.findOneAndDelete({ user: req.user.id });
  
//         res.json({ msg: "Payment Successful", order });
//       } else {
//         res.json({ msg: "Payment verification Failed" });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };