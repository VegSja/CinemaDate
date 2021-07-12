import React from "react"

import PosterComponent from "../components/poster"

export default function LikedPage(){
	return(
		<div>
			<h1>Liked</h1>
			<div className="movie-list-container">
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
