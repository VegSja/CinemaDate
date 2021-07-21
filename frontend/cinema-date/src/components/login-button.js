import React from "react"
import { GoogleLogin } from "react-google-login"
import { useHistory } from "react-router-dom"

const axios = require('axios')

export default function LoginButton() {
	let history = useHistory()
	const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_URL } = process.env

	const onSuccess = async (response) => {
		const data = { token: response.tokenId }
		const res = await axios.post(REACT_APP_API_URL + "/auth/google", data, {
			'Content-Type' : 'text/json'
		})
			.then((res) => {
				console.log(res)
				localStorage.setItem('access_token', res.data.accessToken)
  			axios.defaults.headers.common['authorization'] = `Bearer `+ localStorage.getItem("access_token")
				history.push('/home')
			})
			.catch((err) => {
				console.log("[LOGIN FAILED]")
			})
	}

	const onFailure = (response) => {
		console.log(response)
	}
	return(
		<GoogleLogin 
			clientId={REACT_APP_GOOGLE_CLIENT_ID}
			buttonText="Log in with Google"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={'single_host_origin'}
		/>
	)
}

