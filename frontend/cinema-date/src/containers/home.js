import React, { useState, useEffect } from "react";
import MovieLiker from "../components/movieLikerComponent"
import Modal from "../components/modal"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env

const getMovies = new Promise((resolve, reject) => {
})

export default function HomePage() {
	const [showModal, setShowModal] = useState(false) 
	const [err, setErr] = useState("")
	const [currentMovie, setCurrentMovie] = useState()
	
	useEffect(() => {
		
		const res = axios.get(REACT_APP_API_URL + "/user/unrated/movies", {
			withCredentials: true
		})
			.then((res) => {
				setCurrentMovie(res.data.data[0])
			})
			.catch(err => {
				setErr(err)
				setShowModal(true)
		})
	}, currentMovie)

	const onLike = () => {
		axios.post(REACT_APP_API_URL + "/user/liked/movies", {
			movieId : currentMovie._id
		})
			.then(res => {
				console.log("Successfully sent like to server")
				setCurrentMovie()
			})
			.catch(err => {
				console.log(err)
			})
	}
	if(!currentMovie){
		return emptyList()
	}
	return(
		<div className="home-container">
			<MovieLiker onLike={onLike} movie={currentMovie}/>
				<Modal show={showModal}>
					<h1> Encountered an error </h1>
					<p>{err}</p>
				</Modal>
		</div>
	)
}

const emptyList = () => {
	return(
		<div className="home-container">
			<p>Sorry, you have rated every movie we have in our system... </p>
		</div>
	)
}
