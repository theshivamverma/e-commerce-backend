const express = require("express");
const { User } = require("../models/user.model.js");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const userData = await User.find({})
        .populate("cart")
        .populate("wishlist");
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

module.exports = router;
