import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
// import "./assets/styles/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { googleClient } from './constants';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { disableReactDevTools } from "@fvilers/disable-react-devtools";



if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Google OAuth client
    <GoogleOAuthProvider clientId={`${googleClient.map(item => item.key)}`}>           
        {/**    
            React.StrictMode is a wrapper component provided by React, 
            that helps you identify potential problems in your application.
            It doesn’t affect the actual rendering of your app, 
            but it does provide additional checks and warnings in development mode 
            to help you catch issues early. 
            For example, it can help find components with unsafe lifecycle methods.                                 
        */}      
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>
    </GoogleOAuthProvider>
    // Google OAuth client
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// reportWebVitals(console.log);