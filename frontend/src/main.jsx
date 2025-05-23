import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="ziptfoods.eu.auth0.com"
    clientId="MZdQJMJqMNNCqbCgq7qlTpVMKsd7Tv3Y"
    authorizationParams={{
      redirect_uri: window.location.origin + "/Admin"
    }}
  >
        <App />
    </Auth0Provider>
)
