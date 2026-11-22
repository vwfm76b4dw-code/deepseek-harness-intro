import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root'), {
  onUncaughtError: (error, errorInfo) => {
    window.__renderErrs = window.__renderErrs || [];
    window.__renderErrs.push({
      msg: String((error && error.message) || error).slice(0, 500),
      stack: String((error && error.stack) || '').slice(0, 400),
      component: String((errorInfo && errorInfo.componentStack) || '').slice(0, 400)
    });
    console.error('RENDER-ERR', error);
  }
}).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
