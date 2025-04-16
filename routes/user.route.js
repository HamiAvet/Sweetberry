const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' }); 
        }
        const orders = await Order.find({ userId });
        
        res.status(200).json({
            user: user.toObject(),
            orders: orders
        });
        

    } catch (error) {
        console.error('Error while searching for user data', error);
        res.status(500).send("Error while searching for user data");
    }
});


module.exports = router;