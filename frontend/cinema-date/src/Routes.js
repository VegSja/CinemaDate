import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom"

import Home from "./containers/home"
import Navbar from "./components/navbar"

export default function Routes() {
	return(
		<HashRouter>
			<Navbar />
			<div className="page-content">
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
				</Switch> 
			</div>
		</HashRouter>
	)
}
