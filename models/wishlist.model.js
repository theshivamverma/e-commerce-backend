const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishListSchema = new mongoose.Schema(
  {
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        visible: Boolean
      },
    ],
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", WishListSchema);

module.exports = { WishList };
