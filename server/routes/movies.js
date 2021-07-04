const express = require('express')
const router = express.Router()
const {
	getMovies,
	postMovie
} = require('../controllers/movies')

router.route('/')
	.get(getMovies)
	.post(postMovie)

module.exports = router
