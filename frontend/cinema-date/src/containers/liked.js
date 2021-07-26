import React, {useState, useEffect} from "react"

import PosterComponent from "../components/poster"
import Modal from "../components/modal"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env

const getMovies = new Promise((resolve, reject) => {
	const res = axios.get(REACT_APP_API_URL + "/movies", {withCredentials: true})
		.then((res) => {
			console.log(res)
			resolve(res)
		})
		.catch(err => {
			reject(err)
		})
})

const fillMovieData = (movieList) => {
	let movies = []
	for(var i = 0; i < movieList.length; i++){
		movies.push(<PosterComponent classes="poster-container-list clickable"  image={movieList[i].image}/>)
	}
	return movies
}



export default function LikedPage(){
	const [showModal, setShowModal] = useState(false)
	const [movies, setMovies] = useState([])
	const [err, setErr] = useState()

	useEffect(() => {
		(async () => {
			await getMovies
				.then(doc => {
					console.log(doc)
					setMovies(fillMovieData(doc.data.data))
				})
				.catch(err => {
					setErr(err.message)
					setShowModal(true)
				})
		})()
	}, [movies.length])
	
	return(
		<div>
			<h1>Liked</h1>
			<div className="movie-list-container">
				<Modal show={showModal}>
					<h1> Encountered an error </h1>
					<p>{err}</p>
				</Modal>
				{movies}
			</div>
		</div>
	)
}
