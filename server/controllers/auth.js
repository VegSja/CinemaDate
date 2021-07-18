const express = require('express')

require("dotenv").config()

login = (req, res) => {
	passport.authenticate("auth0", {
		scope: "openid email profile"
	})
	res.status(200).json({
		success: true
	}
}
