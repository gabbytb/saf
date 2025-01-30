import { useState, useEffect, } from 'react';
// import { Link, } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'; // Use this for extracting query parameters
import api from '../api';
import setNigerianTime from "../middlewares/setNigerianTime";
// import { brandOfficialLogoDark, signUpIcon } from '../assets/images';









// ********************************** //
// ***         LOG: EVENT         *** // 
// ********************************** //
const logEvent = (message, mode = 'TRACKER') => {   
    
  // Send the log to a backend server  
  api.post('/api/logs', {
      message,
      mode: mode.toLowerCase(),
      timestamp: setNigerianTime(),
  })
  .then((response) => {
      const { servermessage } = response.data; 
      if (servermessage === "You are logged out") {
          localStorage?.setItem('logout', JSON.stringify(servermessage));
      };
  }) 
  .catch((error) => {        
      console.log('Error encountered while viewing Article Details: ', error.message);
  });
};
// ********************************* //
// ********************************* //






const TestVerifySignUp = () => {  


    // const navigate = useNavigate();



    const [verifiedUser, setVerifiedUser] = useState(null);
    console.log("VERIFIED USER: ", verifiedUser);

    const [status, setStatus] = useState(null);
    console.log("STATUS: ", status);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    
    
    const { search } = useLocation();  // Access the token from the URL params
    // useEffect(() => {
        
    //     const query = new URLSearchParams(search);
    //     const token = query.get('token');
    //     console.log("TOKEN: ", token);

    //     if (!token)  {
    //         return; // Wait until the token is available
    //     };
           
    //     const verifyToken = async () => {           
                
    //         try {

    //             // Send GET request to verify the token
    //             // const response = await api.get('/user/verify', { params: token, });                
    //             const response = await api.get(`/user/verify?token=${token}`);
    //             const data = response.json();
                
    //             if (response.ok) {
    //                 setVerifiedUser(data?.user);
    //                 setStatus(data?.message);
    //                 setLoading(false);  // Update loading state
    //             } else {
    //                 // navigate("/user/login");
    //                 setStatus(data?.message);
    //                 setLoading(false);  // Update loading state
    //             };
                
    //         } catch (err) {
    //             setError(err.response ? err.response.data : 'Error verifying token');
    //             setLoading(false);  // Update loading state
    //         };
    //     };    
    //     verifyToken();

    // }, [search]); // The effect runs again when the token changes
  


    useEffect(() => {
        const params = new URLSearchParams(search); // Extract token from query parameters
        const token = params.get('token');
    
        if (token) {
            // Send the token to the backend for verification
            api.get(`/user/verify?token=${token}`)
            .then((response) => {
                const { success, user, message } = response.data;
                setLoading(success);
                setStatus(message);
                setVerifiedUser(user);

                localStorage.setItem('success', success);
                localStorage.setItem('user', user);
                localStorage.setItem('message', message);
            })
            .catch((err) => {
                setError(err.response ? err.response.data.message : 'Error verifying token');
            })
            .finally(() => {
                setLoading(false);  // Update loading state
            });
        } else {
            return;
        };
    }, [search]);





    if (loading) {
        return <div>Loading...</div>;
    };
  


    if (error) {
        return <div>Error: {error.message || error}</div>;
    };
  



    return (
        <div>
            <h1>Verification Status</h1>
            <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
    );
    // return (
    //     <div id="loginId" className="block h-screen w-full bg-skin-signup-signin-bg">
    //         {/* ADD ton Below:  right-pane */}
    //         <div className="flex flex-col justify-center gap-4 relative bg-skin-signup-signin-bg"> 

    //             {/* PAGE NAV */}
    //             <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
    //                 <Link className="w-56" to={"/"}>
    //                     <img src={brandOfficialLogoDark} alt="brand logo" />
    //                 </Link>
    //             </div>
    //             {/* PAGE NAV */}

    //             <form id="verifySignUpForm" className='max-w-[400px] w-full mx-auto mb-10 rounded-lg bg-skin-signup-signin-bg py-8 px-10' onSubmit={handleFormSubmission}>
                                            
    //                 {/* PAGE ICON */}
    //                 <div className="flex justify-center">
    //                     <img className="h-44 w-48" src={signUpIcon} alt="user-img" />
    //                 </div>
    //                 {/* PAGE ICON */}


    //                 {/* PAGE TITLE */}
    //                 <h2 className='text-2xl dark:text-white font-bold text-center mt-0 mb-24 uppercase opacity-30'>sign up</h2>
    //                 {/* PAGE TITLE */}

                    
    //                 {/* Sign Up Error Message */}
    //                 {
    //                     formSubmitted ?
    //                         <div></div>
    //                         :
    //                         <div className="mx-auto signup_error">
    //                             {formMessage}
    //                         </div>
    //                 }
    //                 {/* Sign Up Error Message */}


    //                 {/* Verification Error Message */}
    //                 {
    //                     verificationSuccessful ?
    //                         <div></div>
    //                         :
    //                         <div className="mx-auto verify_error">
    //                             {verificationMessage}
    //                         </div>
    //                 }
    //                 {/* Verification Error Message */}


    //                 {/* Username */}
    //                 {/* <div className='flex flex-col text-gray-400 py-2'>
    //                     <label htmlFor="username">Username
    //                         <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
    //                     </label>
    //                 </div> */}
    //                 {/* Username */}
                    

    //                 {/* First & Last Name */}
    //                 <div className='flex flex-row text-gray-400 py-2 gap-12'>
    //                     <label htmlFor="firstName">First Name
    //                         <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="firstName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
    //                     </label>

    //                     <label htmlFor="lastName">Last Name
    //                         <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="lastName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
    //                     </label>
    //                 </div>
    //                 {/* First & Last Name */}

                    
    //                 {/* E-mail Address */}
    //                 <div className='flex flex-col text-gray-400 py-2'>
    //                     <label htmlFor="email">E-mail address
    //                         <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
    //                     </label>
    //                 </div>
    //                 {/* E-mail Address */}


    //                 {/* Password */}
    //                 <div className='flex flex-col text-gray-400 py-2'>
    //                     <label htmlFor="password">Password
    //                         <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
    //                     </label>
    //                 </div>
    //                 {/* Password */}


    //                 {/* Approves TandC */}
    //                 <div className="text-white pt-6 pb-0">{/* text-gray-400 */}
    //                     <label className="flex justify-center items-center gap-2 leading-6" htmlFor="approvesTandC">
    //                         {/* ref={checkboxInput} */}
    //                         <input className="mr-2 w-8 h-8" type="checkbox" name="approvesTandC" onChange={handleOnChange} onKeyUp={handleOnKeyUp} /> I have read and understood Samuel Akinola Foundation's terms and conditions.
    //                     </label>
    //                 </div>
    //                 {/* Approves TandC */}
                    
  
    //                 {/* SUBMIT BUTTON */}
    //                 <div className="relative">
    //                     {/* Verification Success Message */}
    //                     {
    //                         verificationSuccessful ?
    //                             <div className="mx-auto absolute top-0 w-full verify_success">
    //                                 <div className="text-white font-bold text-2xl flex justify-center items-center py-4 animate-dropdown">
    //                                     {verificationMessage}
    //                                 </div>
    //                             </div>
    //                             :
    //                             <div></div>
    //                     }
    //                     {/* Verification Success Message */}

    //                     <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase">submit</button>
    //                 </div>
    //                 {/* SUBMIT BUTTON */}


    //                 {/* LINK: SIGN IN & PASSWORD RESET */}
    //                 <div className="login__register flex flex-col mt-4 mb-6 gap-4">
    //                     <p className="text-white">Have an account? <Link className='capitalize' to={"/user/login"}>sign in</Link></p>
    //                     <p className="text-white"><Link to={"/user/password-reset"}>Forgot Password</Link></p>
    //                 </div>
    //                 {/* LINK: SIGN IN & PASSWORD RESET */}


    //                 {/* Sign Up Success Message */}
    //                 {
    //                     formSubmitted ?
    //                         <div className="mt-6 mx-auto signup_success">
    //                             {formMessage}
    //                         </div>       
    //                         :
    //                         <div className="mt-6 mx-auto signup_success"></div>
    //                 }
    //                 {/* Sign Up Success Message */}
    //             </form>
    //         </div>
    //     </div>
    // );
};

export default TestVerifySignUp;