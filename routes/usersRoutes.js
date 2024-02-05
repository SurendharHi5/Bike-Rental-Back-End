const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async(req, res)=>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email, password})

        if(user){
            res.send(user)
        }
        else{
            return res.status(400).json(error)
        }
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.post("/register", async(req, res)=>{
    // const {username, email, password} = req.body

    try {
        const newuser = new User(req.body)
        await newuser.save()
        res.send("User registered successfully")
    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports = router