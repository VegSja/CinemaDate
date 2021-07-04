const express = require('express')
const router = express.Router()
const {
	getMovies,
	getMovieWithName,
	getMoviesWithCategory,
	postMovie
} = require('../controllers/movies')

router.route('/')
	.get(getMovies)
	.post(postMovie)

router.route('/:name')
	.get(getMovieWithName)

module.exports = router
