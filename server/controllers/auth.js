const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()
const axios = require("axios")
const client = new OAuth2Client(process.env.CLIENT_ID)

const UserModel = require('../models/userModel')

const addUserToDatabase = (res, data) => {
	var existingUser = UserModel.findOne({email: data.email})
		.then(doc => {
			if(doc !== null){
				console.log("Found user in database", doc)
				res.status(201).json({
					success: true,
					message: "User already exist in database",
					data: doc
				})
				return
			}else{
				var user = new UserModel({
					name: data.name,
					email: data.email
				})
				user.save()
					.then(doc => {
						console.log("Successfully saved user: ", user)
						res.status(201).json({
							success: true,
							data: doc
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

const checkAxiosIdToken = async (response, token) => {
	const rep = await axios.post("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token, {
		'Content-Type': 'text/json'
	})
		.then((res) => {

			addUserToDatabase(response, res.data)
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
		
		const { name, email, picture } = ticket.getPayload()

		res.status(201).json({
			name: name,
			email: email,
			picture: picture
		})
	}
	catch(e){
		//TODO: CHANGE THIS AT A LATER DATE
		try{
			checkAxiosIdToken(res, token)
		}catch(error){
			console.log(error)
			res.status(400).json({
				success: false,
				message: error
			})
		}
	}
	
	
}

module.exports = {
	postGoogleLogin
}
