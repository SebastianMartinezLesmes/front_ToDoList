import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import CreateUser from './CreateUser'; /* interfas de crear usuario */
import Admin from './Admin';
import Client from './Client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Login/>
  </React.StrictMode>
);
