const router = require('express').Router()
const Order = require('../models/order')
const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken')

//create new order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//update order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        {new: true});
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
});

//delete order
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted.");
      } catch (err) {
        res.status(500).json(err);
      }
});


//get user's orders
router.get('/find/:userId', verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.findOne({userId: req.params.userId});
        res.status(200).json(orders);
      } catch (err) {
        res.status(500).json(err);
      }
});

//get all 
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error);   
    }
});

//get monthly income 
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: prevMonth }}},
            {
                $project: {
                    month: { $month: "$createdAt"}, 
                    sales: '$amount'
                }
            },
            {
                $group: {
                    _id: '$month', 
                    sales: {$sum: '$sales'}
                }
            }
        ]);
        res.status(200).json(income)
    } catch (error) {
        res.status(500).json(err);
    }
});

module.exports = router