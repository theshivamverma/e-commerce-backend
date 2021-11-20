const express = require("express");
const router = express.Router();

const {
  getUserDetailFromId,
  sendUserDetail
} = require("../controllers/user.controller");

const { isAuthenticated } = require("../middlewares/isAuthenticated.middleware")

router.route("/userdetail").get(isAuthenticated, getUserDetailFromId, sendUserDetail);

module.exports = router;
