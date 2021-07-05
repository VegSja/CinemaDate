import React from 'react';
import { useLocation } from 'react-router-dom'

import { ReactComponent as HomeIcon } from "../static/icons/home_black_24dp.svg"

export default function Navbarlink(props){
	var location = useLocation();
	var isActive = location.pathname === props.to
	var className = isActive ? 'icon-active' : 'icon';

	return(
		<div className="navbar-entry">
			<HomeIcon className={className}/>
		</div>
	)
}
