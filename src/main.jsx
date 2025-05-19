// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
// si todavía necesitas algún reset extra o Tailwind: import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
