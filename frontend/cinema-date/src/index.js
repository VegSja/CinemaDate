import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom"

import { Auth0Provider } from "@auth0/auth0-react"

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

ReactDOM.render(
  <Auth0Provider
  domain={domain}
  clientId={clientId}
  redirectUri="http://localhost:3000/#/home"
  audience="https://dev-9vyrhkrr.eu.auth0.com/api/v2/"
  scope="read:current_user update:current_user_metadata">
    <Router>
      <App />
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);
