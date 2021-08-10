import React from "react"
import FriendEntry from "../components/friend-entry"

export default function FriendsPage(){
	return(
		<div>
			<h1 className="page-header">Friends</h1>
			<div className="friends-container">
				<FriendEntry name="Vegard" />
				<FriendEntry name="Vegard" />
				<FriendEntry name="Vegard" />
				<FriendEntry name="Vegard" />
			</div>
		</div>
	)
}
