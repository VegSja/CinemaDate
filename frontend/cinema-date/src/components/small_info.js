import React from "react";

export default function SmallInfoComponent(props){
	return(
		<div className="info-box floating small-box">
			<p className="small-info-text">{props.text}</p>
		</div>
	)
}
