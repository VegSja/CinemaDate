import React, { useEffect } from "react";
import MovieLiker from "../components/movieLikerComponent"

const movie = {
	title: "Star Wars",
	poster: "https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg", 
	categories: ["Action", "Horror", "Love", "Erotic", "SCI-FI"],
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at justo et elit egestas mattis. Duis sagittis rutrum velit, in sollicitudin lorem eg",
	year: 2006,
	runtime: "1h 16min"
}


export default function HomePage(){
	const onLike = () => {
		console.log("User liked ", movie.title)
	}
	
	return(
		<div className="home-container">
			<h1 className="page-title" />
			<MovieLiker onLike={onLike} movie={movie}/>
		</div>
	)
}

