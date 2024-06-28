import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="domain.zone.auth0.com"
    clientId="your_id_here"
    authorizationParams={{
      redirect_uri: window.location.origin + "/Admin"
    }}
  >
        <App />
    </Auth0Provider>
)
