import React from "react"

import "../static/css/buttons.css"

export default function GeneralButton(props){
	return(
		<div className="clickable general-button floating" onClick={props.onClick}>
			<p className="button-text">{props.text}</p>
		</div>
	)
}
