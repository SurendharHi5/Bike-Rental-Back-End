const express = require("express");
const router = express.Router()
const Booking = require("../models/bookingModel")
const Bike = require("../models/bikeModel")
const Razorpay = require('razorpay');
const crypto = require("crypto")
const dotenv = require("dotenv")
dotenv.config();

router.post("/bookingbike", async(req,res)=>{

            try {
                const instance = new Razorpay({
                    key_id: process.env.KEY_ID,
                    key_secret: process.env.KEY_SECRET,
                });
        
                const options = {
                    amount: req.body.totalAmount * 100,
                    currency: "INR",
                    receipt: "receipt_order_74394",
                };

                const order = await instance.orders.create(options);
                // console.log(order)
        
                if (order) {
                    req.body.orderId = order.id;                    
                    const newBooking = new Booking(req.body);
                    await newBooking.save();
                    const bike = await Bike.findOne({_id : req.body.bike});
                    // console.log(req.body.bike);
                    bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
                    await bike.save();
                    res.send("Booking Successfull")
                }
                else{
                    return res.status(500).send("Some error occured");
                }
        
               
            } catch (error) {
                console.log(error)
                return res.status(400).json(error)
            }

})



router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

       
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
    
        if (digest == razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        res.json({
            msg: "Booking Successfull",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/getallbookings", async(req, res) =>{
    try {
        const bookings = await Booking.find().populate("bike")
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports = router