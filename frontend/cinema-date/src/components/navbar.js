import React from "react"

import Navbarlink from "./navbar-link"

import { ReactComponent as HomeIcon } from "../static/icons/home_black_24dp.svg"
import { ReactComponent as LikeIcon } from "../static/icons/thumb_up_black_24dp.svg"
import { ReactComponent as FriendsIcon } from "../static/icons/group_black_24dp.svg"
import LogoutButton from "../components/logout-button"

import "../static/css/navbar.css"

export default function Navbar(){
	return(
		<div className="floating grey navbar">
			<nav>
				<ul className="navbar-nav">
					<Navbarlink to="/home" text="Home">
						<HomeIcon />
					</Navbarlink>
					<Navbarlink to="/liked" text="Liked">
						<LikeIcon />
					</Navbarlink>
					<Navbarlink to="/friends" text="Friends">
						<FriendsIcon />
					</Navbarlink>
					<Navbarlink to="/" text="Logout">
						<LogoutButton />
					</Navbarlink>
				</ul>
			</nav>
		</div>
	)
}
