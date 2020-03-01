const express = require('express');
const router = express.Router();
require('../lib/passport');

const { 
  home, 
  logout, 
  register, 
  login 
} = require('../controllers/userController');

const myValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Please fill out the entire form' });
  next();
};

router.get('/', home);
router.get('/logout', logout);
router.post('/register', myValidation, register);
router.post('/login', login);

module.exports = router;
