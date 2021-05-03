const express = require("express");
const { User } = require("../models/user.model.js");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const userData = await User.find({}).select('username email -_id')
      res.json({ success: true, userData });
    } catch (err) {
      res.json({ success: false, errorMessage: err.message });
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.body;
      const NewUser = new User(user);
      const savedUser = await NewUser.save();
      res.json({ success: true, savedUser });
    } catch (err) {
      res.json({ success: false, errorMessage: err.message });
    }
  });

  router.param("userId", async (req, res, next, id) => {
    try{
      const user = await User.findById(id);
      if(!user){
        res.status(400).json({success: false, message: "Error getting user data"})
      }
      req.user = user;
      next();
    }catch(error){
      res.status(400).json({ success: false, message: "Error getting user data", errorMessage: err.message })
    }

  })

  router.route("/:userId")
  .get((req, res) => {
    const { user } = req;
    user.password = undefined,
    user.email = undefined,
    res.status(200).json({ success: true, user })
  })

module.exports = router;
