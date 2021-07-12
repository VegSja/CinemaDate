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
			<div className="svg-container">
				{props.props.children}
			</div>
			<p className="navbarlink-text">{props.props.text}</p>
		</NavLink>
	);
}

function DefaultNavbarLink(props){
	return(
		<NavLink className='navbar-entry' to={props.props.to}>
			<div className="svg-container">
				{props.props.children}
			</div>
			<p className="navbarlink-text">{props.props.text}</p>
		</NavLink>
	);
}
