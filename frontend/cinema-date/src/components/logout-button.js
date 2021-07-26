import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { ReactComponent as LogoutIcon } from "../static/icons/logout_black_24dp.svg"

const axios = require('axios')
const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_URL } = process.env

export default function LogoutButton() {
	const { logout } = useAuth0();
	
	const onLogout = async() => {
		const req = axios.post(REACT_APP_API_URL + "/auth/logout", {
			withCredentials: true
		})
			.then(res => {
				console.log("Successfully logged out")
			})
			.catch(err => {
				console.log("Failed to logout: " + err)
			})
	}

	return( 
	<div onClick={onLogout}>
		<div className="svg-container">
			<LogoutIcon />
		</div>
	</div>)
}
