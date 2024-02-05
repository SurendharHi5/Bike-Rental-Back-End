const express = require("express");
const dbConnection = require("./db")
const app = express();
const cors = require("cors");

const port = 3000;

app.use(cors());
app.use(express.json())
app.use('/api/bikes/' , require('./routes/bikesRoutes'))
app.use("/api/users/", require("./routes/usersRoutes"))
app.use("/api/bookings/", require("./routes/bookingRoute"))


app.listen(port,(err) =>{
    if(err){
        console.error(err);
    }

    console.log(`Server Listening on ${port}`)
})