import React, { useState, useEffect } from "react";
import MovieLiker from "../components/movieLikerComponent"
import Modal from "../components/modal"
import "../static/css/animations/animations.css"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env


export default function HomePage() {
	const [err, setErr] = useState()
	const [currentMovie, setCurrentMovie] = useState()
	const [isLiked, setIsLiked] = useState() 

	useEffect(() => {
		console.log("Sending request for new movie")	
		const res = axios.get(REACT_APP_API_URL + "/user/unrated/movies", {
			withCredentials: true
		})
			.then((res) => {
				if(res.data.data.length === 0){
					setErr("You have rated every movie!")
				}
				setCurrentMovie(res.data.data[0])
				setIsLiked(false)
			})
			.catch(err => {
				setErr(err.toString())
		})
	}, currentMovie)

	const onLike = () => {
		setIsLiked(true)
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
	const onDislike = () => {
		setIsLiked(true)
		axios.post(REACT_APP_API_URL + "/user/disliked/movies", {
			movieId : currentMovie._id
		})
			.then(res => {
				console.log("Successfully sent dislike to server")
				setCurrentMovie()
			})
			.catch(err => {
				console.log(err)
			})
	}


	return(
		<div className="home-container grid-center">
			<MovieLiker className={isLiked ? "float_out" : ""} onLike={onLike} onDislike={onDislike} movie={currentMovie}/>
			<Modal show={err} onClose={() => setErr()}>
					<h1> Encountered an error </h1>
					{err}
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
