var express = require('express');
var router = express.Router();
const { createMovie, getAllMovies, getOneMovie, updateMovie, deleteMovie} = require('./controller/moviesController');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Hello from moviesRouter');
});

router.get('/get-all-movies', getAllMovies)

router.post('/create-movie', createMovie);

router.post('/get-one-movie', getOneMovie);

router.put('/update-movie', updateMovie);

router.delete("/delete-movie", deleteMovie);

module.exports = router;