const express = require('express')
const router = express.Router()
const {
	getLikedMovies,
	addLikedMovie
} = require('../controllers/user')

router.route('/liked/movies')
	.get(getLikedMovies)
	.post(addLikedMovie)

module.exports = router
