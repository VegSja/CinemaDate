import React from "react";
import PosterComponent from "../components/poster"
import InfoComponent from "../components/info"
import SmallInfoComponent from "../components/small_info"

export default function MovieInfoComponent(props){
	const movie = props.movie

	const CategoriesList = () => (
		<div className="SmallInfo-container">
			{movie.categories.map(function(item) {
				return <SmallInfoComponent text={item} />;
			})}
		</div>
	)

	if(!movie){
		return <p></p>
	}

	return(
		<div className="info-container">
			<PosterComponent image={movie.image}/>
			<h1 className="movieTitle">{movie.name}</h1>
			<CategoriesList />
			<InfoComponent header="Description" text={movie.synopsis}/>
			<div className="SmallInfo-container">
				<SmallInfoComponent text={movie.year} />
				<SmallInfoComponent text={movie.runtime} />
			</div>
		</div>
	)
}
