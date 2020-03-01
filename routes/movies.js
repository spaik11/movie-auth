const express = require('express');
const router = express.Router();

const { 
  home, 
  viewMovie, 
  findMovie, 
  foundMovie, 
  getAddMovie, 
  addMovie, 
  updateMovie, 
  deleteMovie 
} = require('../controllers/movieController');

const authUser = (req, res, next) => {
  if (!req.isAuthenticated()) return res.render('error');
  next();
};

router.get('/home', home);
router.get('/viewmovies', authUser, viewMovie);
router.get('/findmovie', authUser, findMovie);
router.get('/foundmovie', authUser, foundMovie)
router.get('/addmovie', authUser, getAddMovie);
router.post('/addmovie', addMovie);
router.put('/:title', updateMovie);
router.delete('/:title', deleteMovie);

module.exports = router;
