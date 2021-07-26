const UserModel = require('../models/userModel')

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

const addLikedMovie = async(req, res) => {
	const movieId = req.body.movieId
	const user = await UserModel.findOne({email: req.user})
		.then(doc => {
			doc.liked_movies.push(movieId)
			return doc.save()
		})
		.then(doc => {
			console.log("Successfully saved to server", doc)
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
	addLikedMovie
}
