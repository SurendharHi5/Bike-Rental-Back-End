const express = require("express");
const dbConnection = require("./db")
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}));

app.use('/api/bikes/' , require('./routes/bikesRoutes'))
app.use("/api/users/", require("./routes/usersRoutes"))
app.use("/api/bookings/", require("./routes/bookingRoute"))


app.listen(port,(err) =>{
    if(err){
        console.error(err);
    }

    console.log(`Server Listening on ${port}`)
})