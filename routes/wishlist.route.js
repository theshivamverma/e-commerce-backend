const express = require("express");

const router = express.Router();

const {
  createNewWishlist,
  getWishlistByParam,
  getWishlistData,
  addItemToWishlist,
  removeItemFromWishlist,
} = require("../controllers/wishlist.controller");

const {
  isAuthenticated,
} = require("../middlewares/isAuthenticated.middleware");

router.route("/add/new").get(createNewWishlist);

router.use(isAuthenticated);

router.param("wishlistId", getWishlistByParam);

router.route("/:wishlistId").get(getWishlistData).post(addItemToWishlist);

router.route("/:wishlistId/remove").post(removeItemFromWishlist);

module.exports = router;
