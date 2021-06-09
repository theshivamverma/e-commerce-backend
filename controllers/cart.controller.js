const { Cart } = require("../models/cart.model.js");

async function createNewCart(req, res) {
  try {
    const NewCart = new Cart();
    const savedData = await NewCart.save();
    res.json({ success: true, savedData });
  } catch (err) {
    res.json({ success: false, errorMessage: err.message });
  }
}

async function getCartFromParam(req, res, next, id) {
  try {
    const cart = await Cart.findById(id).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    if (!cart) {
      res
        .status(400)
        .json({ success: false, message: "error retrieving cart" });
    }
    req.cart = cart;
    next();
  } catch {
    res.status(400).json({ success: false, message: "error retrieving cart" });
  }
}

function getCartDetail(req, res) {
  let { cart } = req;
  res.json({ success: true, cart });
}

async function addItemToCart(req, res) {
  try {
    const { prodId } = req.body;
    let { cart } = req;
    let flag = false;
    cart.products.map((cartItem) => {
      if (cartItem.product._id == prodId) {
        flag = true;
        Cart.update(
          { "products._id": cartItem._id },
          {
            $set: {
              "products.$.quantity": 1,
              "products.$.visible": true,
            },
          },
          function (err, doc) {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.json({ doc });
          }
        );
      }
    });
    if (flag === false) {
      const cartItem = {
        product: prodId,
        quantity: 1,
        visible: true,
      };
      cart.products.push(cartItem);
      const savedData = await cart.save();
      res.json({ success: true, savedData });
    }
  } catch (err) {
    res.json({ success: false, errorMessage: err.message });
  }
}

async function incrementItemInCart(req, res) {
  try {
    const { prodId } = req.body;
    const { cart } = req;
    cart.products.map((cartItem) => {
      if (cartItem.product._id == prodId) {
        Cart.update(
          { "products._id": cartItem._id },
          {
            $set: {
              "products.$.quantity": cartItem.quantity + 1,
            },
          },
          function (err, doc) {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.json({ doc });
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error updating cart",
      errorMessage: err.message,
    });
  }
}

async function decrementItemInCart(req, res) {
  try {
    const { prodId } = req.body;
    const { cart } = req;
    cart.products.map((cartItem) => {
      if (cartItem.product._id == prodId) {
        Cart.update(
          { "products._id": cartItem._id },
          {
            $set: {
              "products.$.quantity": cartItem.quantity - 1,
            },
          },
          function (err, doc) {
            if (err) {
              console.log(err);
              return res.status(400).send(err);
            }
            res.json({ doc });
          }
        );
      }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error updating cart",
      errorMessage: err.message,
    });
  }
}

async function removeItemFromCart(req, res) {
  const { prodId } = req.body;
  let { cart } = req;
  cart.products.map((cartItem) => {
    if (cartItem.product._id == prodId) {
      Cart.update(
        { "products._id": cartItem._id },
        {
          $set: {
            "products.$.quantity": 0,
            "products.$.visible": false,
          },
        },
        function (err, doc) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          res.json({ success: true, doc });
        }
      );
    }
  });
}

module.exports = {
  createNewCart,
  addItemToCart,
  getCartFromParam,
  getCartDetail,
  incrementItemInCart,
  decrementItemInCart,
  removeItemFromCart,
};
