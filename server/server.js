const express = require('express')
const app = express()

const moviesRouter = require('./routes/movies')
const categoryRouter = require('./routes/category')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/movies', moviesRouter)
app.use('/api/categories', categoryRouter)

//Connect to mongoose
const dbPath = 'mongodb://localhost/cinemadate';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);

mongo
	.then(() => {
		console.log("Connected to database")
	})
	.catch(err => {
		console.log(err, 'error');
	})

app.listen(3000, () => {
	console.log("Server is listening on port 3000.....")
})
