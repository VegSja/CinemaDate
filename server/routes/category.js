const express = require('express')
const router = express.Router()
const { postCategory, getCategories } = require('../controllers/category')

router.route('/')
	.get(getCategories)
	.post(postCategory)

module.exports = router
