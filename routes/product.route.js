const express = require("express");
const router = express.Router();
const { Product } = require("../models/product.model.js");
const { extend } = require("lodash");
const data = require("../data.js");

function fillDataIntoDB() {
  data.forEach(async (product) => {
    try {
      const NewProduct = await new Product(product);
      const savedProduct = await NewProduct.save();
      console.log({ savedProduct });
    } catch (err) {
      console.log({ err });
    }
  });
}

// fillDataIntoDB()

router
  .route("/")
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "cannot get products",
          errMessage: err.message,
        });
    }
  })
  .post(async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, product: savedProduct });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to add products",
          errorMessage: err.message,
        });
    }
  });

router.param("productId", async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "error retrieving product" });
    }
    req.product = product;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "error retrieving product" });
  }
});

router
  .route("/:productId")
  .get((req, res) => {
    const { product } = req;
    product.__v = undefined;
    res.json({ success: true, product });
  })
  .post(async (req, res) => {
    const productUpdate = req.body;
    let { product } = req;
    product = extend(product, productUpdate);
    product = await product.save();
    res.json({ success: true, product });
  })
  .delete(async (req, res) => {
    const { product } = req;
    await product.remove();
    res.json({ success: true, product });
  });

module.exports = router;
