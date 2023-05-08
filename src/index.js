import React from 'react';
import ReactDOM from 'react-dom/client';
import './components/styles/global-styles.css';
import Home from './components/templates/Home/index';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

