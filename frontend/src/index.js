import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId="<186540709862-90o38njpk76t6lfu475d0g87j22r810a.apps.googleusercontent.com>"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>
);
