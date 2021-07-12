import React from "react";

export default function PosterComponent(props){
	const className="poster-container floating " + props.classes

	return(
		<div className={className}>
			<img src={props.image} alt="poster" />
		</div>
	)
}
