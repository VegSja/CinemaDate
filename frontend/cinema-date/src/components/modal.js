import React, {useState, useEffect} from "react"
import "../static/css/modal.css"

import {ReactComponent as CloseIcon} from "../static/icons/close_black_24dp.svg"
export default function Modal(props){
	const className = props.show ? "modal floating grey" : "modal floating hidden"
	
	//We are buidling a container that darkens the background and disables mouse interaction with background
	return(
		<div className={`modal-cover ${props.show ? "appear" : "hidden"}`}> 
			<div className={className}>
				<CloseIcon className="close-button clickable" onClick={props.onClose}/>
				{props.children}
			</div>
		</div>
	)
}
