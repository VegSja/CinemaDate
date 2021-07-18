const express = require('express')

const jwt = require("express-jwt")
const jwksRsa = require('jwks-rsa')

const moviesRouter = require('./routes/movies')
const categoryRouter = require('./routes/category')
const mongoose = require('mongoose')

//App variables 
const app = express()



// App config
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
   	jwksUri: `https://dev-9vyrhkrr.auth0.com/.well-known/jwks.json`
	}),

	//Validate audience and the issuer
	audience: 'https://cinemapal-api',
	issuer: `https://dev-9vyrhkrr.auth0.com/`,
	algorithms: ['RS256']
})

app.use(checkJwt)

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

app.listen(8000, () => {
	console.log("Server is listening on port 8000.....")
})
