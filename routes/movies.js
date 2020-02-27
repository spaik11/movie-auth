const express = require('express');
const router = express.Router();
const Movie = require('../models/Movies');
const movieController = require('../controllers/movieController');
const userController = require('../controllers/userController');

router.get('/home', movieController.home);
router.get('/viewmovies', movieController.viewMovie);
router.get('/findmovie', movieController.findMovie);
router.get('/foundmovie', movieController.foundMovie)
router.get('/addmovie', (req, res) => {
  if (req.user === undefined) return res.render('error');
  res.render('main/addMovie');
});

router.post('/addmovie', movieController.addMovie);
router.put('/:title', movieController.updateMovie);
router.delete('/:title', movieController.deleteMovie);
router.get('/logout', userController.logout);

module.exports = router;
