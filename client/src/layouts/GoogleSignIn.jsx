import React, { useState } from 'react';
import api from '../api';







const GoogleSignIn = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState(null);


    const handleGoogleLogin = async (response) => {

        try {

            const authorizationCode = response.code;
            console.log('Authorization Code:', authorizationCode);


            // Send the authorization code to the backend to get the access token
            const result = await api.post('/api/v1/auth/gmail/login', {}, {  // Replace with your backend URL  
                    headers: {
                        Authorization: authorizationCode,
                    },
                },
            );


            if (result.status === 200) {
                setIsAuthenticated(true);
                setUserDetails(result.data);
                console.log('User details:', result.data);
            };

        } catch (error) {
            setError('Authentication failed');
            console.error('Error during authentication', error);
        };

    };


    const handleFailure = (error) => {
        setError('Google login failed');
        console.error('Login failed:', error);
    };


    return (
        <div>
            {
                !isAuthenticated ? (
                    <>
                        <h1>Google Sign-In</h1>
                        <div className="g-signin2" data-onsuccess={handleGoogleLogin} data-onfailure={handleFailure}></div>
                        {
                            error 
                                && <p>{error}</p>
                        }
                    </>
                  ) : (
                    <div>
                        <h1>Welcome {userDetails ? userDetails.name : ''}!</h1>
                        <p>Email: {userDetails ? userDetails.email : ''}</p>
                        <img src={userDetails ? userDetails.picture : ''} alt="User" />
                    </div>
                  )}
              </div>
    );
};

export default GoogleSignIn;