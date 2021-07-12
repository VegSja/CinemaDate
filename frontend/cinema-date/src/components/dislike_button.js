import React, { useState } from "react";
import "../static/css/buttons.css"
import {ReactComponent as DislikeIcon } from "../static/icons/thumb_down_black_24dp.svg"

export default function DislikeButton(){
	const [isActive, setActive] = useState(false)
	
	let id = ""

	if(isActive){
		id += "active"
	}


	return(
		<div className="button-container dislike clickable" id={id} onClick={() => setActive(true)}> 
			<DislikeIcon />
		</div>
	)
}
