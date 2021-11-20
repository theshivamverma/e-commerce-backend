const { WishList } = require("../models/wishlist.model.js");

async function createNewWishlist(req, res) {
  try {
    const NewWishList = new WishList();
    const savedData = await NewWishList.save();
    res.status(200).json({ success: true, savedData });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error saving to new wishlist",
      errorMessage: err.message,
    });
  }
}

async function getWishlistByParam(req, res, next, id) {
  try {
    const wishList = await WishList.findById(id).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    if (!wishList) {
      res
        .status(400)
        .json({ success: false, message: "error fetching wishlist" });
    }
    req.wishlist = wishList;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error fetching wishlist data",
      errorMessage: err.message,
    });
  }
}

async function getWishlistData(req, res) {
  const { wishlist } = req;
  res.json({ success: true, wishlist });
}

async function addItemToWishlist(req, res) {
  try {
    const { prodId } = req.body;
    let { wishlist } = req;
    let flag = false;
    const wishListItem = {
      product: prodId,
      visible: true,
    };
    wishlist.products.map((currentwishListItem) => {
      if (currentwishListItem.product._id == prodId) {
        flag = true;
        WishList.update(
          { "products._id": currentwishListItem._id },
          {
            $set: {
              "products.$.visible": true,
            },
          },
          function (err, doc) {
            if (err) {
              res
                .status(400)
                .json({ success: false, errorMessage: err.message });
            }

            res.status(200).json({ success: true, doc });
          }
        );
      }
    });
    if (flag === false) {
      wishlist.products.push(wishListItem);
      const savedData = await wishlist.save();
      res.status(200).json({ success: true, savedData });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error saving to wishlist",
      errorMessage: err.message,
    });
  }
}

async function removeItemFromWishlist(req, res) {
  try {
    const { prodId } = req.body;
    const { wishlist } = req;
    wishlist.products.map((currentwishListItem) => {
      if (currentwishListItem.product._id == prodId) {
        WishList.update(
          { "products._id": currentwishListItem._id },
          {
            $set: {
              "products.$.visible": false,
            },
          },
          function (err, doc) {
            if (err) {
              res
                .status(400)
                .json({ success: false, errorMessage: err.message });
            }
            res.status(200).json({ success: true, doc });
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, errorMessage: err.message });
  }
}

module.exports = {
  createNewWishlist,
  getWishlistByParam,
  getWishlistData,
  addItemToWishlist,
  removeItemFromWishlist,
};
