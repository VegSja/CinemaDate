import React from "react";
import MovieInfoComponent from "./movieInfoComponent"
import LikeButton from "../components/like_button"
import DislikeButton from "../components/dislike_button"

export default function MovieLiker(props){

	const movie = props.movie

	if(!movie){
		return <p></p>
	}

	return(
		<div className="movie-liker-container float_in">
			<MovieInfoComponent movie={movie} />	
			<LikeButton onClick={props.onLike}/>

			<DislikeButton onClick={props.onDislike} />
		</div>
	)
}
