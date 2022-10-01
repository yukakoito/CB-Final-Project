import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import UserProvider from './components/UserContext';
import DataProvider from './components/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <UserProvider>
        <DataProvider>
        <App />
        </DataProvider>
      </UserProvider>
  // </React.StrictMode>
);

