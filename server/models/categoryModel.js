var mongoose = require('mongoose')

var categorySchema = mongoose.Schema({
	name : {
		type: String,
		reguired: true,
		unique: true
	}
})

//Static functions 
categorySchema.statics.getAllCategories = function() {
	return new Promise((resolve, reject) => {
		this.find()
			.then(docs => {
				resolve(docs)
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}


module.exports = mongoose.model('category', categorySchema)
