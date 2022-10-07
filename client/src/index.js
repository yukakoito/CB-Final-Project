import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';
import UserProvider from './components/UserContext';
import DataProvider from './components/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      redirectUri={window.location.origin}
    >
      <UserProvider>
        <DataProvider>
        <App />
        </DataProvider>
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
