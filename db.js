const mongoose = require ("mongoose");
const dotenv = require("dotenv")
dotenv.config();

function connectDB (){
    mongoose.connect(process.env.DB_URI)

    const connection = mongoose.connection

    connection.on("connected", ()=>{
        console.log("MongoDB connected")
    })
    connection.on("eroor",()=>{
        console.log("MongoDB Connection failed")
    })
}
connectDB()

module.exports = mongoose