import React from "react"

import { ReactComponent as ProfileIcon } from '../static/icons/person_black_24dp.svg'

export default function FriendEntry(props){
	const {name} = props

	return(
		<div className="friend floating grey">
			<div className="online-indicator offline"/>
			<ProfileIcon className="profile-icon" />
			<p className="list-name">{name}</p>
		</div>
	)
}
