const express = require('express')
const { postGoogleLogin, postLogout } = require('../controllers/auth')
const router = express.Router()

router.route('/google')
	.post(postGoogleLogin)

router.route('/logout')
	.post(postLogout)
module.exports = router
