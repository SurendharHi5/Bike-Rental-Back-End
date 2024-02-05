const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    userName : {type: String},
    bike : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bikes"
    },
    bikeName : {type: String},
    totalDays : {type: Number},
    totalHours : {type: Number},
    totalAmount : {type: Number},
    bookedTimeSlots : {
        from:{type: String},
        to:{type: String}
    },
    transactionId : {type: String}
},
    {timestamps: true}
)

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel