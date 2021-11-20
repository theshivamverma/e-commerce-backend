const { Product } = require("../models/product.model.js");
const { extend } = require("lodash");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "cannot get products",
      errMessage: err.message,
    });
  }
}

async function addNewProduct(req, res) {
  try {
    const product = req.body;
    const NewProduct = new Product(product);
    const savedProduct = await NewProduct.save();
    res.json({ success: true, product: savedProduct });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "unable to add products",
      errorMessage: err.message,
    });
  }
}

async function getProductByParam(req, res, next, id) {
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
}

function getProductDetail(req, res) {
  const { product } = req;
  product.__v = undefined;
  res.json({ success: true, product });
}

async function updateProduct(req, res) {
  const productUpdate = req.body;
  let { product } = req;
  product = extend(product, productUpdate);
  product = await product.save();
  res.json({ success: true, product });
}

async function deleteProduct(req, res) {
  const { product } = req;
  await product.remove();
  res.json({ success: true, product });
}

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductByParam,
  getProductDetail,
  updateProduct,
  deleteProduct,
};
