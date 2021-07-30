import React from "react"
import LoginButton from "../components/login-button.js"
import GeneralButton from "../components/general_button"

import {ReactComponent as LandingImage} from "../static/images/movie.svg"

import "../static/css/landing.css"

export default function LandingPage(){

	return(
		<div className="grid-center">
			<div className="landing-container">
				<h1 className="header-text">The Future of Movienights</h1>
				<p className="subtext damped-text">Ever wanted to watch a movie with some friends? MoviePal is here to help</p>
				<LoginButton className="Button"/>
				<LandingImage className="image"/>
			</div>
		</div>
	)
}
