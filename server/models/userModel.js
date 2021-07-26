var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	liked_movies : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movie'
	}],
	disliked_movies : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'movie'
	}],
	friends : [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	}]
})

module.exports = mongoose.model('user', userSchema)
