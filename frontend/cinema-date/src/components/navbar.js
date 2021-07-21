import React from "react"

import Navbarlink from "./navbar-link"

import { ReactComponent as HomeIcon } from "../static/icons/home_black_24dp.svg"
import { ReactComponent as LikeIcon } from "../static/icons/thumb_up_black_24dp.svg"
import { ReactComponent as FriendsIcon } from "../static/icons/group_black_24dp.svg"
import { ReactComponent as LogoutIcon } from "../static/icons/logout_black_24dp.svg"

import "../static/css/navbar.css"

export default function Navbar(){
	return(
		<div className="floating navbar">
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
					<Navbarlink to="/logout" text="Logout">
						<LogoutIcon />
					</Navbarlink>
				</ul>
			</nav>
		</div>
	)
}
