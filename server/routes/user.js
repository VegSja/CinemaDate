const express = require('express')
const router = express.Router()
const {
	getLikedMovies,
	getUnratedMovies,
	addLikedMovie,
	addDislikedMovie,
} = require('../controllers/user')

router.route('/liked/movies')
	.get(getLikedMovies)
	.post(addLikedMovie)

router.route('/disliked/movies')
	.post(addDislikedMovie)

router.route('/unrated/movies')
	.get(getUnratedMovies)

module.exports = router
