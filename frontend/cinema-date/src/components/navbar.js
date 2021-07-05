import React from "react"
import { NavLink } from "react-router-dom"

import Navbarlink from "./navbar-link"

export default function Navbar(){
	return(
		<div className="floating navbar">
			<nav>
				<NavLink to="/">
					<Navbarlink to="/"/>
				</NavLink>
				<NavLink to="/about">
					<Navbarlink to="/about"/>
				</NavLink>
			</nav>
		</div>
	)
}
