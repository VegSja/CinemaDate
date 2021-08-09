import React, {useState, useEffect} from "react"

import MovieListEntry from "../components/movieListEntry"
import Modal from "../components/modal"
import MovieInfoComponent from "../components/movieInfoComponent"
import "../static/css/animations/animations.css"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env


export default function LikedPage(){
	const [showModal, setShowModal] = useState(false)
	const [movies, setMovies] = useState([])
	const [modalContent, setModalContent] = useState()

	const onEntryClicked = (movie) => {
		setModalContent(<MovieInfoComponent movie={movie}/>)
		setShowModal(true)
	}

	const fillMovieData = (movieList) => {
		let movies = []
		for(var i = 0; i < movieList.length; i++){
			movies.push(<MovieListEntry movie={movieList[i]} onClick={onEntryClicked}/>)
		}
		return movies
	}


	useEffect(() => {
		const res = axios.get(REACT_APP_API_URL + "/user/liked/movies", {withCredentials: true})
			.then((res) => {
				console.log("Setting moviedata")
				if(movies !== res.data.data){
					setMovies(fillMovieData(res.data.data))
				}
			})
			.catch(err => {
				setShowModal(true)
				setModalContent(
				<div>
					<h1>Error</h1>
					<p>{err.toString()}</p>
				</div>)
			})
	}, [movies.length])
	
	return(
		<div>
			<div className={showModal ? "unfocused" : ""}>
				<h1 className="page-header">Your Likes</h1>
				<div className="movie-list-container">
					{movies}
				</div>
			</div>
				<Modal show={showModal} onClose={() => setShowModal(false)}>
					{modalContent}				
				</Modal>
		</div>
	)
}

