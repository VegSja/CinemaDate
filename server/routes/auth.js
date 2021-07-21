const express = require('express')
const { postGoogleLogin } = require('../controllers/auth')
const router = express.Router()

router.route('/google')
	.post(postGoogleLogin)

module.exports = router
