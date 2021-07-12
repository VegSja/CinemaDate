import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom"

import HomePage from "./containers/home"
import FriendsPage from "./containers/friends"
import LikedPage from "./containers/liked"
import Navbar from "./components/navbar"

export default function Routes() {
	return(
		<HashRouter>
			<Navbar />
			<div className="page-content">
				<Switch>
					<Route exact path="/home">
						<HomePage />
					</Route>
					<Route exact path="/liked">
						<LikedPage />
					</Route>
					<Route exact path="/friends">
						<FriendsPage />
					</Route>
				</Switch> 
			</div>
		</HashRouter>
	)
}
