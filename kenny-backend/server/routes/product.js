const router = require('express').Router()
const Product = require('../models/product')
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken')

//create new product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//update product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true});
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
});

//delete product
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
});


//get product
router.get('/find/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
});

//get all products
router.get('/', async (req, res) => {
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    console.log(queryCategory)
    try {
        let products;
        if (queryNew) {
            products = await Product.find().sort({createdAt: -1}).limit(1)
        } else if (queryCategory) {
            products = await Product.find({ category: {
                $in: [queryCategory],
            } });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
      } catch (err) {
        res.status(500).json(err);
      }
});

module.exports = router