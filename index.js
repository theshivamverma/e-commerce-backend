const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const productRouter = require("./routes/product.route.js");
const cartRouter = require("./routes/cart.route.js");
const userRouter = require("./routes/user.route.js");
const wishListRouter = require("./routes/wishlist.route.js");
const authRouter = require("./routes/auth.route.js");

const { errorHandler } = require("./middlewares/errorHandler.middleware");
const { routeNotFound } = require("./middlewares/routeNotFound.middleware");

const { initializeDBConnection } = require("./db/db.connect.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

initializeDBConnection();

app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

// error handlers
app.use(errorHandler)
app.use(routeNotFound)

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
