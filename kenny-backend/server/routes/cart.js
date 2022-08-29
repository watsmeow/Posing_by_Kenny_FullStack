const router = require('express').Router()
const Cart = require('../models/cart')
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken')

//create new cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//update cart
router.put('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true});
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json(error)
    }
});

//delete cart
router.delete('/:id', verifyTokenAndAuth, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
});


//get user's cart
router.get('/find/:userId', verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(Cart);
      } catch (err) {
        res.status(500).json(err);
      }
});

//get all 
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);   
    }
});

module.exports = router