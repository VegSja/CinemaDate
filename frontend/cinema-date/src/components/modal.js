import React from "react"
import "../static/css/modal.css"

import {ReactComponent as CloseIcon} from "../static/icons/close_black_24dp.svg"
export default function Modal(props){
	const className = props.show ? "modal floating" : "modal floating hidden"

	return(
		<div className={className}>
			<CloseIcon className="close-button clickable"/>
			{props.children}
		</div>
	)
}
