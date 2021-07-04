const express = require('express')
const MovieModel = require('../models/movieModel')
const CategoryModel = require('../models/categoryModel');

const getMovies = (req, res) => {
	MovieModel.getAllMovies()
		.then(data => {
			res.json({
				success: true,
				message: "Got all movies successfully",
				data: data
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

const getMovieWithName = (req, res) => {
	MovieModel.find({name: req.params.name})
		.populate("category")
		.then(data => {
			res.json({
				success: true,
				data: data
			})
		})
		.catch(err => {
			console.log(err)
			res.json({
				success: false,
				message: err
			})
		})
}

const getMoviesWithCategory = (req, res) => {
	var { category } = CategoryModel.find({
		name: req.params.categoryName
	})
	MovieModel
		.find({
			categories: category
		})
		.then(data => {
			res.json({
				success: true,
				data: data
			})
		})
		.catch(err => {
			console.log(err)
			res.status(404).json({
				success: false,
				message: "Could not get mvoie"
			})
		})
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

