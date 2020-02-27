const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
require('../lib/passport');

const myValidation = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Please fill out the entire form' });
  next();
};

router.get('/', userController.home);
router.get('/logout', userController.logout);
router.post('/register', myValidation, userController.register);
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/movies/home',
  failureRedirect: '/',
  failureFlash: true
  })
);


module.exports = router;
