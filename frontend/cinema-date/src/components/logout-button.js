import React from "react"
import { useAuth0 } from "@auth0/auth0-react"

const axios = require('axios')
const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_URL } = process.env

export default function LogoutButton() {
	const { logout } = useAuth0();
	
	const onLogout = async() => {
		const res = await axios.post(REACT_APP_API_URL + "/auth/logout")
			.then((res) => {
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}

	return( 
	<button onClick={onLogout}>
	Logout
	</button>)
}
