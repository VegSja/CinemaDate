import React, { useState } from "react";
import "../static/css/buttons.css"
import {ReactComponent as LikeIcon } from "../static/icons/thumb_up_black_24dp.svg"

export default function LikeButton(props){
	const [isActive, setActive] = useState(false)
	
	let id = ""

	if(isActive){
		id += "active"
	}


	const click = () => {
		setActive(true)
		props.onClick()
	}

	return(
		<div className="button-container like clickable" id={id} onClick={click}> 
			<LikeIcon />
		</div>
	)
}
