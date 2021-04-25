const express = require("express")
const { User } = require("../models/user.model")

const router = express.Router();

router.route("/")
.post(async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.find({ username });
        if(user[0].password == password){
            res.status(200).json({ success: true, message: "login successfull", user });
        }
        
    }catch(err){
        res.status(401).json({ success: false, message: "Incorrect username/password" })
    }
})

module.exports = router