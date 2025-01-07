import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App'; //<App />
import Login from './Login'; // <Login/>
// import Personajes from './personajes'; // <Personajes/>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Login/>

  </React.StrictMode>
);
