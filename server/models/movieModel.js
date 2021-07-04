var mongoose = require('mongoose')
var CategoryModel = require('./categoryModel')

var movieSchema = mongoose.Schema({
	name : {
		type: String,
		required: true,
		unique: true
	},
	year : {
		type: Number,
		required: true,
	},
	runtime : {
		type: String,
	},
	synopsis :{
		type: String
	},
	image : {
		type: String
	},
	categories : [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category'
	}]	
});

movieSchema.statics.getAllMovies = function() {
	return new Promise((resolve, reject) => {
		this.find()
			.populate("categories") //Fill in the info for the model registered as "category"
			.then(docs => {
				resolve(docs)
			})
			.catch(err => {
				console.log(err)
				return reject(err)
			})
	})
}

movieSchema.methods.fillCategories = function fillCategories(categories){
	return new Promise((res, rej) => {
		for(var i = 0; i < categories.length; i++){
			const name = categories[i]
			CategoryModel.findOne({ name: name })
				.then(category => {
					if(!category){
						category = new CategoryModel({
							name : name
						})
						category.save()
					}
					this.categories.push(category)
					if(this.categories.length == categories.length){
						res(this);
					}
				})
				.catch(err => {
					console.log(err)
					rej(err);
				})
		}
	})
}

module.exports = mongoose.model('movie', movieSchema)
