import React from "react"
import { GoogleLogin } from "react-google-login"
import { useHistory } from "react-router-dom"
import GeneralButton from "./general_button"

const axios = require('axios')

export default function LoginButton(props) {
	let history = useHistory()
	const { REACT_APP_GOOGLE_CLIENT_ID, REACT_APP_API_URL } = process.env

	const onSuccess = async (response) => {
		const data = { token: response.tokenId }
		const res = await axios.post(REACT_APP_API_URL + "/auth/google", data, {
			'Content-Type' : 'text/json'
		})
			.then((res) => {
				localStorage.setItem('access_token', res.data.accessToken)
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
			render={renderProps => (
				<GeneralButton onClick={renderProps.onClick} text="Start your journey" className={props.className}/>	
			)}
			buttonText="Log in with Google"
			onSuccess={onSuccess}
			onFailure={onFailure}
			cookiePolicy={'single_host_origin'}
		/>
	)
}

