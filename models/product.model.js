const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "product should have a name",
    },
    images: [String],
    mrp: {
      type: Number,
      required: "product should have a mrp",
    },
    price: {
      type: Number,
      required: "product price is mandatory",
    },
    rating: Number,
    ratings: Number,
    category: {
      type: String,
      required: "product category is required",
    },
    offers: [String],
    tags: [String],
    fastDelivery: Boolean,
    inStock: Boolean,
    freeDelivery: Boolean,
    deliveryCharge: Number,
    description: {
      type: String,
      required: "description cannot be empty",
    },
    amazonLink: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
