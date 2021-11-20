const express = require("express");

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

const {
  addItemToCart,
  getCartFromParam,
  getCartDetail,
  createNewCart,
  incrementItemInCart,
  decrementItemInCart,
  removeItemFromCart,
} = require("../controllers/cart.controller");

const router = express.Router();

router.route("/add/new").get(createNewCart);

router.use(isAuthenticated)

router.param("cartId", getCartFromParam);

router.route("/:cartId").get(getCartDetail).post(addItemToCart);

router.route("/:cartId/update/inc").post(incrementItemInCart);

router.route("/:cartId/update/dec").post(decrementItemInCart);

router.route("/:cartId/update/remove").post(removeItemFromCart);

module.exports = router;