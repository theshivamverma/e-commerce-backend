const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  username: {
    type: String,
    required: "username is mandatory",
    unique: [true, "username should be unique"],
  },
  password: {
    type: String,
    required: "Password is required",
  },
  email: {
    type: String,
    required: "Email is required",
    unique: [true, "email already exists"],
  },
  cart: { type: Schema.Types.ObjectId, ref: "Cart" },
  wishlist: { type: Schema.Types.ObjectId, ref: "WishList" },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
