const { User } = require("../models/user.model.js");

async function getUserDetailFromId(req, res, next) {
  try {
    const id = req.userId 
    const user = await User.findById(id);
    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Error getting user data" });
    }
    req.user = user;
    next();
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error getting user data",
        errorMessage: err.message,
      });
  }
};

function sendUserDetail(req, res) {
  const { user } = req;
  (user.password = undefined),
    res.status(200).json({ success: true, user });
};

module.exports = { getUserDetailFromId, sendUserDetail }