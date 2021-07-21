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

userSchema.statics.getLikedMovies = async function() {
	return new Promise((resolve, reject) => {
		this.find({}, {liked_movies:1})
			.then(docs => {
				resolve(docs)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
	})
}

module.exports = mongoose.model('user', userSchema)
