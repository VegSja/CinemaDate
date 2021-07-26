import React, { useState, useEffect } from "react";
import MovieLiker from "../components/movieLikerComponent"
import Modal from "../components/modal"

const axios = require('axios')

const { REACT_APP_API_URL } = process.env

const getMovies = new Promise((resolve, reject) => {
	const res = axios.get(REACT_APP_API_URL + "/user/unrated/movies", {
		withCredentials: true
	})
		.then((res) => {
			console.log(res)
			resolve(res)
		})
		.catch(err => {
			reject(err)
	})
})

export default function HomePage() {
	const [showModal, setShowModal] = useState(false) 
	const [err, setErr] = useState("")
	const [currentMovie, setCurrentMovie] = useState()
	const [movieList, setMovieList] = useState([])
	
	useEffect(() => {
		if(movieList.length <= 1){
			(async () => {
				await getMovies
					.then(doc => {
						setMovieList(doc.data.data)
					})
					.catch(err => {
						setErr(err.message)
						setShowModal(true)
					})
			})()
		}
		setCurrentMovie(movieList[0])
	}, [movieList.length])

	const onLike = () => {
		console.log("Liked: ", currentMovie._id)
		axios.post(REACT_APP_API_URL + "/user/liked/movies", {
			movieId : currentMovie._id
		})
			.then(res => {
				console.log("Successfully sent like to server")
				setMovieList(movieList.splice(1, movieList.length))
			})
			.catch(err => {
				console.log(err)
			})
	}
	if(movieList.length === 0){
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
