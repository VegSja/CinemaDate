import React from "react";
import PosterComponent from "../components/poster"
import InfoComponent from "../components/info"
import SmallInfoComponent from "../components/small_info"
import LikeButton from "../components/like_button"
import DislikeButton from "../components/dislike_button"

export default function MovieLiker(props){

	const movie = props.movie

	const CategoriesList = () => (
		<div className="SmallInfo-container">
			{movie.categories.map(function(item) {
				return <SmallInfoComponent text={item} />;
			})}
		</div>
	)


	return(
		<div className="info-container">
			<PosterComponent image={movie.poster}/>
			<h1 className="movieTitle">{movie.title}</h1>
			<CategoriesList />
			<InfoComponent header="Description" text={movie.description}/>
			<div className="SmallInfo-container">
				<SmallInfoComponent text={movie.year} />
				<SmallInfoComponent text={movie.runtime} />
			</div>
			<LikeButton onClick={props.onLike}/>

			<DislikeButton />
		</div>
	)
}
