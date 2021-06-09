const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addNewProduct,
  getProductByParam,
  getProductDetail,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.route("/").get(getAllProducts).post(addNewProduct);

router.param("productId", getProductByParam);

router
  .route("/:productId")
  .get(getProductDetail)
  .post(updateProduct)
  .delete(deleteProduct);

module.exports = router;
