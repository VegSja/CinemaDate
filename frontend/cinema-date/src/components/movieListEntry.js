import React from "react";
import PosterComponent from "./poster"
export default function MovieListEntry(props){
	const movie = props.movie

	const onClick = () => {
		console.log(movie)
		props.onClick(movie)
	}

	return(
		<div onClick={onClick}>
			<PosterComponent classes="poster-container-list clickable float_in"  image={movie.image}/>
		</div>
	)
}
