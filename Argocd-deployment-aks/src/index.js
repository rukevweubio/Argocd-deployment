// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This will be an empty file for Tailwind, or you can add custom CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>