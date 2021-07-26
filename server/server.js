const express = require('express')

const moviesRouter = require('./routes/movies')
const categoryRouter = require('./routes/category')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const authenticateToken = require('./middleware/auth')

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
//App variables 
const app = express()

require('dotenv').config()


// App config
app.use(cors({
	credentials: true,
	origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Ordering of middleware is important. Dont need to validate token on auth
app.use('/api/auth', authRouter)
app.use(authenticateToken)
app.use('/api/movies', moviesRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/user/', userRouter)

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
