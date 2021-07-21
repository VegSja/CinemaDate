const express = require('express')
const MovieModel = require('../models/movieModel')
const CategoryModel = require('../models/categoryModel');

async function getMovies(req, res){
	console.log("Recieved getcall from", req)
	const {name, categoryName} = req.query;
	//Get every movie from DB
	let results = await MovieModel.getAllMovies();

	//Filter away based on filters
	if(name){
		const foundMovie = await getMovieWithName(name)
		results = results.filter(movie => movie.name == foundMovie.name)
	}
	if(categoryName){
		let movies = await getMoviesWithCategory(categoryName)
		movies = movies.map(movie => movie.name)
		results = results.filter(movie => movies.includes(movie.name))
	}
	res.status(200).json({
		success: true,
		data: results
	})
}



async function getMovieWithName(name) {
	var movie = MovieModel.findOne({name: name})
		.populate("categories")
	return movie
}

async function getMoviesWithCategory(categoryName){
	var category = await CategoryModel.findOne({name: categoryName})
	console.log(category)
	return MovieModel.find({ categories: category }).populate('categories')
}

const postMovie = (req, res) => {
	var movie = new MovieModel({
		name: req.body.name,
		year: req.body.year,
		runtime: req.body.runtime,
		synopsis: req.body.synopsis,
		image: req.body.image,
	})
	const categoryNames = req.body.categories

	movie.fillCategories(categoryNames)
		.then(response => {
			response.save()
				.then(doc => {
					res.json({
						success: true,
						message: "Successfully added movie",
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
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				success: false,
				message: err
			})
		})
}

module.exports = {
	getMovies,
	getMovieWithName,
	getMoviesWithCategory,
	postMovie
}

