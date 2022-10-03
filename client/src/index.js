import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';
import UserProvider from './components/UserContext';
import DataProvider from './components/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth0Provider
      domain="dev-djc25cr1.us.auth0.com"
      clientId="6vYEXBtwyn4uTDEJFWNBm0SNU2YrQ5rE"
      redirectUri={window.location.origin}
    >
      <UserProvider>
        <DataProvider>
        <App />
        </DataProvider>
      </UserProvider>
    </Auth0Provider>
  // </React.StrictMode>
);
