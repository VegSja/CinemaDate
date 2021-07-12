import React from "react";
import PosterComponent from "../components/poster"
import InfoComponent from "../components/info"
import SmallInfoComponent from "../components/small_info"
import LikeButton from "../components/like_button"
import DislikeButton from "../components/dislike_button"

export default function HomePage(){
	return(
		<div className="home-container">
			<h1 className="page-title"></h1>
			
			<div className="info-container">
				<PosterComponent image="https://static.posters.cz/image/1300/plakater/star-wars-episode-viii-the-last-jedi-one-sheet-i97646.jpg"/>
				<h1 className="movieTitle">Star Wars</h1>
				<div className="SmallInfo-container">
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
				</div>
				<InfoComponent header="Description" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras at justo et elit egestas mattis. Duis sagittis rutrum velit, in sollicitudin lorem eg"/>
				<div className="SmallInfo-container">
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
					<SmallInfoComponent text="Action" />
				</div>
				<LikeButton />
				<DislikeButton />
			</div>
		</div>
	)
}
