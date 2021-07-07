import React from 'react';
import { NavLink,useLocation } from 'react-router-dom'

export default function Navbarlink(props){
	var location = useLocation();
	console.log(location)
	var isActive = location.pathname === props.to
	if(isActive){
		return <ActiveNavbarLink props={props}/>
	}	
	return <DefaultNavbarLink props={props}/>
};

function ActiveNavbarLink(props){
	return(
		<NavLink className='navbar-entry icon-active' to={props.props.to}>
			{props.props.children}
		</NavLink>
	);
}

function DefaultNavbarLink(props){
	return(
		<NavLink className='navbar-entry' to={props.props.to}>
			{props.props.children}
		</NavLink>
	);
}
