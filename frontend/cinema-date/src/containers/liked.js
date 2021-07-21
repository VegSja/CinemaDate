import React, {useState, useEffect} from "react"

import PosterComponent from "../components/poster"
import Modal from "../components/modal"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env

const getMovies = async() => {
	const res = await axios.get(REACT_APP_API_URL + "/movies", {
		withCredentials: true
	})
		.then((res) => {
			console.log(res)
		})
		.catch(e => {
			console.log(e.message)
		})
}

export default function LikedPage(){
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		getMovies()
	})

	return(
		<div>
			<h1>Liked</h1>
			<div className="movie-list-container">
				<Modal show={showModal}>
					<h1> Halla! </h1>
				</Modal>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<PosterComponent classes="poster-container-list clickable"  image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
			</div>
		</div>
	)
}
