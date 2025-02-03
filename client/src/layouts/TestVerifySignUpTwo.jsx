import { useState, useEffect, } from 'react';








const TestVerifySignUpTwo = () => {


    const [verificationStatus, setVerificationStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Assuming you get the token from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
    
        if (token) {
            // Call the backend to verify the token
            fetch(`http://localhost:8000/user/verify?token=${token}`)
                .then((response) => response.json())
                .then((data) => {
                    // Log the full response payload for debugging
                    console.log(data);                

                    // Assuming the backend returns a `message` and `data`
                    setVerificationStatus(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Verification failed');
                    setLoading(false);
                });
        } else {
            setError('No token provided');
            setLoading(false);
        };
    }, []);
    

    if (loading) {
    return <div>Loading...</div>;
    };


    if (error) {
    return <div>{error}</div>;
    };


    // Display the verification status message and user data
    return (
        <div>
            <h1>Verification Status</h1>
            {
                verificationStatus ? (
                    <div>
                    <p>{verificationStatus.message}</p>
                    <p>User ID: {verificationStatus.data.id}</p>
                    <p>Name: {verificationStatus.data.firstname} {verificationStatus.data.lastname}</p>
                    <p>Email: {verificationStatus.data.email}</p>
                    <p>Status: {verificationStatus.data.status}</p>
                    <p>Verified: {verificationStatus.data.isverified ? 'Yes' : 'No'}</p>
                    </div>
                ) : (
                    <div>No status available</div>
                )
            }
        </div>
    );
};
    
export default TestVerifySignUpTwo;