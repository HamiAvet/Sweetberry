const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/reg', 
  [
    check('email', 'Not a Email').isEmail(),
    check('password', 'Incorrect password').isLength({ min: 6 })
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data"
        });
      }

      const { email, password, firstname, lastname, phonenumber, address } = req.body;

      const isUsed = await User.findOne({ email });

      if (isUsed) {
        return res.status(400).json({ message: 'This email is already taken, try another one' }); 
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword,  firstname, lastname, phonenumber, address });

      await user.save();

      return res.status(201).json({ message: 'New account is created' });
      
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', 
  [
    check('email', 'Not a Email').isEmail(),
    check('password', 'Incorrect password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data"
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' }); 
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (isMatch) {
        const jwtSecret = 'ey8teviuberuvt456345geuveuvtguysvg6w7t467f3gvsgfsu';

        const token = jwt.sign(
          { userId: user.id }, 
          jwtSecret, 
          { expiresIn: '1h' }
        );

        return res.json({ token, userId: user.id }); 
      } else {
        return res.status(401).json({ message: "Wrong password" });
      }

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server error' }); 
    }
});

module.exports = router;