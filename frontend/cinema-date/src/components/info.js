import React from "react";

export default function InfoComponent(props){
	return(
		<div className="info-box floating">
			<h2 className="info-header">{props.header}</h2>
			<p className="subtext damped-text">{props.text}</p>
		</div>
	)
}
