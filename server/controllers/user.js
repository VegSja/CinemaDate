const UserModel = require('../models/userModel')
const MovieModel = require('../models/movieModel')

const getLikedMovies = async(req, res) => {
	const user = await UserModel.findOne({email: req.user})
		.populate("liked_movies")
		.then(doc => {
			res.status(200).json({
				success: true,
				data: doc.liked_movies
			})
		})
		.catch(err => {
			res.status(400).json({
				success: false,
				message: err
			})
		})
}

const getUnratedMovies = async(req, res) => {
	let ratedMovies = []
	const user = await UserModel.findOne({email: req.user})
		.populate("liked_movies")
		.populate("disliked_movies")
		.then(docs => {
			ratedMovies.push(...docs.liked_movies)
			ratedMovies.push(...docs.disliked_movies)
			ratedMovies = ratedMovies.map(movie => movie.name)
			return MovieModel.getAllMovies()
		})
		.then(all_movies => {
			const filtered_array = all_movies.filter((movie) => !ratedMovies.includes(movie.name))
			res.status(200).json({
				success: true,
				data: filtered_array
			})
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				success: false,
				message: error
			})
		})
}

const addLikedMovie = async(req, res) => {
	const movieId = req.body.movieId
	const user = await UserModel.findOne({email: req.user})
		.then(doc => {
			doc.liked_movies.push(movieId)
			return doc.save()
		})
		.then(doc => {
			res.status(200).json({
				success: true,
				data: doc
			})
		})
		.catch(err => {
			console.log(err)
			res.status(400).json({
				success: false,
				message: err
			})
		})
}
module.exports = {
	getLikedMovies,
	getUnratedMovies,
	addLikedMovie
}
