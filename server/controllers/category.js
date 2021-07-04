const express = require('express')
const CategoryModel = require('../models/categoryModel');

const getCategories = (req, res) => {
	CategoryModel.getAllCategories()
		.then(data => {
			res.json({
				success: true,
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


const postCategory = (req, res) => {
	const category = new CategoryModel({
		name: req.body.name
	})
	category.save()
		.then(doc => {
			res.json({
				success: true,
				data: doc
			})
		})
		.catch(err => {
			console.log(err)
			res.status(400).send(err)
		})
}

module.exports = {
	postCategory,
	getCategories
}
