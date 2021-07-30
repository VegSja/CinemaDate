import React, {useState, useEffect} from "react"

import PosterComponent from "../components/poster"
import Modal from "../components/modal"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env

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
		const res = axios.get(REACT_APP_API_URL + "/user/liked/movies", {withCredentials: true})
			.then((res) => {
				console.log("Setting moviedata")
				if(movies !== res.data.data){
					setMovies(fillMovieData(res.data.data))
				}
			})
			.catch(err => {
				console.log(err)
			})
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
