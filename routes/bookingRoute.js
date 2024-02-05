const express = require("express");
const router = express.Router()
const Booking = require("../models/bookingModel")
const Bike = require("../models/bikeModel")
const { v4: uuidv4 } = require('uuid');
const dotenv = require("dotenv")
dotenv.config();
const stripe = require("stripe")(process.env.KEY_SECRET)



router.post("/bookingbike", async(req,res)=>{
    const {token} = req.body
    try {
        const customer = await stripe.customers.create({
            email : token.email,
            source : token.id
        })

        const payment = await stripe.paymentIntents.create({
            amount : req.body.totalAmount * 100,
            currency : "inr",
            customer : customer.id,
            receipt_email : token.email
        },
        {
            idempotencyKey : uuidv4()
        }
        )

        if(payment){
            req.body.transactionId = payment.customer.id;
            const newBooking = new Booking(req.body);
            await newBooking.save();
            const bike = await Bike.findOne({_id : req.body.bike});
            console.log(req.body.bike);
            bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await bike.save();
            res.send("Booking Successfull")
        }
       else{
        return res.status(400).json(error)
       }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

router.get("/getallbookings", async(req, res) =>{
    try {
        const bookings = await Booking.find().populate("bike")
        res.send(bookings)
    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports = router