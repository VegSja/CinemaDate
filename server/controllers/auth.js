const { OAuth2Client } = require('google-auth-library')
const axios = require("axios")
const client = new OAuth2Client(process.env.CLIENT_ID)

const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const generateAccessToken = (username) => {
	return jwt.sign(username, process.env.SECRET, {})
}

const addUserToDatabase = (res, req, data) => {
	var existingUser = UserModel.findOne({email: data.email})
		.then(doc => {
			if(doc !== null){
				res.cookie("JWT", generateAccessToken(doc.email), {
					maxAge: 100000000, //One day
					httpOnly: true
				})
				res.status(201).json({
					success: true,
					message: "User already exist in database",
					data: doc
				})
			}else{
				var user = new UserModel({
					name: data.name,
					email: data.email
				})
				user.save()
					.then(doc => {
						res.cookie("JWT", generateAccessToken(doc.email), {
							maxAge: 100000000, //One day
							httpOnly: true
						})
						res.status(201).json({
							success: true,
							data: doc,
							accessToken: generateAccessToken(doc.email)
						})
					})
					.catch(err => {
						console.log(err)
						throw(err)
					})
			}
		})
		.catch(err => {
			throw(err)
		})	
}

const checkAxiosIdToken = async (response, req, token) => {
	const rep = await axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token, {
		'Content-Type': 'text/json'
	})
		.then((res) => {
			addUserToDatabase(response, req, res.data)
		})
		.catch((e) => {
			console.log(e)
			throw(e)
		})
}

const postGoogleLogin = async (req, res) => {
	const { token } = req.body
	try{
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.CLIENT_ID
		})
		addUserToDatabase(res, req, ticket.getPayload())
	}
	catch(e){
		//The above code will throw on development, but not in production
		try{
			await checkAxiosIdToken(res, req, token)
		}catch(error){
			console.log(error)
			res.status(400).json({
				success: false,
				message: error
			})
		}
	}
	
}

const postLogout = async(req, res) => {
	res.clearCookie('JWT')
	res.status(200).json({
		success: true,
		message: "Logged out successfully"
	})
}

module.exports = {
	postGoogleLogin,
	postLogout
}
