import React from "react";
import { Route, Switch, HashRouter, withRouter } from "react-router-dom"

import LandingPage from "./containers/landing"
import HomePage from "./containers/home"
import FriendsPage from "./containers/friends"
import LikedPage from "./containers/liked"
import Navbar from "./components/navbar"

function Routes() {
	return(
		<HashRouter>
				<Switch>
					<Route exact path="/">
						<LandingPage />
					</Route>
					<Route exact path="/home">
						<Navbar />
						<div className="page-content">
							<HomePage />
						</div>
					</Route>
					<Route exact path="/liked">
						<Navbar />
						<div className="page-content">
							<LikedPage />
						</div>
					</Route>
					<Route exact path="/friends">
						<Navbar />
						<div className="page-content">
							<FriendsPage />
						</div>
					</Route>
				</Switch> 
		</HashRouter>
	)
}

export default withRouter(Routes)
