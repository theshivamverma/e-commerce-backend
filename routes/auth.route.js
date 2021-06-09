const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  checkUsernameValidity,
  checkEmailValidity,
} = require("../controllers/auth.controller");

router.post("/login", loginUser);

router.post("/username-check", checkUsernameValidity);

router.post("/email-check", checkEmailValidity);

router.post("/signup", signupUser);

module.exports = router;
