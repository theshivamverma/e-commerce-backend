const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

function isAuthenticated(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1]
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } else {
    res.status(400).json({ success: false, message: "Bad request" });
  }
}

module.exports = { isAuthenticated };
