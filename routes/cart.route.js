const express = require("express");
const { Cart } = require("../models/cart.model.js");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const cart = await Cart.find({}).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    res.json({ success: true, cart });
  } catch (err) {
    res.json({ success: false, message: "error retrieving carts data" });
  }
});

router.route("/add/new").post(async (req, res) => {
  try {
    // const { prodId } = req.body;
    // const cartItem = {
    //   product: prodId,
    //   quantity: 1,
    //   visible: true,
    // };
    const NewCart = new Cart();
    // NewCart.products.push(cartItem);
    const savedData = await NewCart.save();
    res.json({ success: true, savedData });
  } catch (err) {
    res.json({ success: false, errorMessage: err.message });
  }
});

router.param("cartId", async (req, res, next, id) => {
  try {
    const cart = await Cart.findById(id).populate({
      path: "products",
      populate: {
        path: "product",
        model: "Product",
      },
    });
    if (!cart) {
      res.status(400).jsn({ success: false, message: "error retrieving cart" });
    }
    req.cart = cart;
    next();
  } catch {
    res.status(400).json({ success: false, message: "error retrieving cart" });
  }
});

router
  .route("/:cartId")
  .get((req, res) => {
    let { cart } = req;
    res.json({ success: true, cart });
  })
  .post(async (req, res) => {
    try {
      const { prodId } = req.body;
      let { cart } = req;
      let flag = false
      cart.products.map(cartItem => {
        if(cartItem.product._id == prodId){
           flag = true;
           Cart.update(
             { "products._id": cartItem._id },
             {
               $set: {
                 "products.$.quantity": 1,
                 "products.$.visible": true
               },
             },
             function (err, doc) {
               if (err) {
                 console.log(err);
                 return res.send(err);
               }
               res.json({ doc });
             }
           );
        }
      })
      if(flag === false){
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
  });

router
  .route("/:cartId/update/inc")
  .post(async (req, res) => {
    try {
      const { prodId } = req.body;
      const { cart } = req;
      cart.products.map((cartItem) => {
        if (cartItem.product._id == prodId) {
          Cart.update({'products._id': cartItem._id}, 
            {'$set': {
              'products.$.quantity': cartItem.quantity + 1
            }},function(err, doc){
              if(err){
                console.log(err)
                return res.send(err)
              }
              res.json({ doc })
            })
        }
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "error updating cart",
        errorMessage: err.message,
      });
    }
  });


router.route("/:cartId/update/dec").post(async (req, res) => {
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
              return res.send(err);
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
});

router.route("/:cartId/update/remove")
.post(async (req, res) => {
  const { prodId } = req.body;
  let { cart } = req;
  cart.products.map(cartItem => {
    if(cartItem.product._id == prodId){
      Cart.update({'products._id': cartItem._id}, {'$set': {
        'products.$.quantity': 0,
        'products.$.visible': false
      }}, function(err, doc){
        if(err){
          console.log(err)
          res.send(err)
        }
        res.json({ success: true, doc })
      })
    }
  })
})

module.exports = router;


  // .post(async (req, res) => {
  //   try {
  //     const { prodId } = req.body;
  //     const { cart } = req;
  //     cart.products.map((cartItem) => {
  //       if (cartItem.product._id == prodId) {
  //         const itemIndex = cart.products.indexOf(cartItem);
  //         const updatedCartItem = {
  //           product: cartItem.product,
  //           quantity: cartItem.quantity + 1,
  //         };
  //         console.log(cart.products.pull({ _id: cartItem._id }));
  //         cart.products.set(itemIndex, updatedCartItem);
  //       }
  //     });
  //     const result = await cart.save();
  //     res.json({ success: true, result });
  //   } catch (err) {
  //     res
  //       .status(400)
  //       .json({
  //         success: false,
  //         message: "error updating cart",
  //         errorMessage: err.message,
  //       });
  //   }
  // });