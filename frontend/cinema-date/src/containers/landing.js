import React from "react"
import LoginButton from "../components/login-button.js"
import LogoutButton from "../components/logout-button.js"


export default function LandingPage(){

	return(
		<div>
			<h1>Landing</h1>
			<LoginButton />
			<LogoutButton />
		</div>
	)
}
