const { Router } = require('express');
const router = Router();
const Order = require('../models/Order');


router.post('/', 
  async (req, res) => {
    try {
      const { orderId, userId, items } = req.body;
      
      const date = new Date().toLocaleDateString()
      
      const newOrder = new Order({orderId, userId, date, items});
      
      await newOrder.save();
     
      return res.status(201).json({ message: 'New order is created' });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;