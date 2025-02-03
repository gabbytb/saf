import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // For URL handling
import api from '../api';  // For making API calls





const TestVerification = () => {

    const location = useLocation();
    const navigate = useNavigate();  // To redirect after successful verification

    const [message, setMessage] = useState('');
    console.log("MESSAGE: ", message);

    const [error, setError] = useState('');
    console.log("ERROR: ", error);
    
    const { search } = useLocation();
    console.log("Search in Current Location: ", search);


    // This function is triggered when the component mounts
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        console.log("Query Params: ", queryParams);

        const token = queryParams.get('token');  // Get token from the URL query parameter
        console.log("Token: ", token);

        if (token) {
            // Send a request to verify the token
            verifyToken(token);
        } else {
            setError("Token is missing from the URL.");
        };

    }, [location]);


    // Function to call the backend and verify the token
    const verifyToken = async (token) => {
        
        try {
            // Make a GET request to your backend to verify the token
            const response = await api.get(`/user/verify?token=${token}`);
            console.log("RESPONSE FORM:", response);

            // Assuming the backend sends a success message after verification
            if (response.data.success) {
                setMessage(response.data.message);                
                // Redirect to login page (or signup page, or wherever needed)
                navigate('/user/signup');
            } else {                
                setError("Verification failed. Please try again.");
            };

        } catch (error) {            
            setError("There was an error with token verification.");
        };
    };


    return (
        <div>
            <h1>Verify Your Account</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}  {/* Show success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Show error message */}
        </div>
    );
};

export default TestVerification;
