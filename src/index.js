import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import CreateUser from './CreateUser';
import Admin from './Admin';
import Client from './Client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /><br/>
    <Login/>
    <CreateUser/>
    <Admin/>
    <Client/>
  </React.StrictMode>
);
