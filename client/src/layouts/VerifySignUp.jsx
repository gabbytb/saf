import { useState, useEffect, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { brandOfficialLogoDark, signUpIcon } from '../assets/images';










const VerifySignUp = () => {  


    const navigate = useNavigate();

    // console.clear();
    
    // USE= useLocation Hook to get the current location object using react-router-dom
    // const location = useLocation(); 
    // console.log("CURRENT URL: ", location);
    // const { pathname, search, } = location;
    // console.log("CURRENT URL PATHNAME: ", pathname);
    // console.log("CURRENT URL SEARCH: ", search);
    
    // VERSUS
    
    // console.log("CURRENT URL: ", window.location);
    // const { origin, protocol, host, pathname, search, } = window.location;
    // console.log("ORIGIN: ", origin, 
    //          "\n\nWEBSITE URL: ", protocol + "//" + host + pathname +  search);
    // console.log("PATHNAME: ", pathname);
    // console.log("SEARCH: ", search);
    // console.log("CURRENT URL HOST: ", window.location.host);
    // console.log("CURRENT URL HREF: ", window.location.href);




    
    // *********************************************** //
    // *** MANAGE STATE:  USER PAYLOAD FOR SIGN UP *** //
    // *********************************************** //
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", approvesTandC: false, });
    // console.log("*** NEW ACCOUNT DETAILS ***\nUser: ", user);
    const [formMessage, setFormMessage] = useState("");
    // console.log("Login Attempt: ", formMessage);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Login Successful: ", formSubmitted);
    async function handleOnKeyUp(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };
    async function handleOnChange(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });        
    };
    async function handleFormSubmission(e) {
        e.preventDefault();

        await api.post("/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message, data } = response.data;
            let errMsg = document.querySelector('#verifySignUpForm .signup_error'); 
            let successMsg = document.querySelector('#verifySignUpForm .signup_success');

            if ((!success) && (message === "Fill all the required inputs")) {
                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                            
                errMsg?.classList?.remove('signup_error');
                errMsg?.classList?.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList?.remove('error-message-info');
                    errMsg?.classList?.add('signup_error');
                }, 3000);
                // Perform These Actions
            } else if ((!success) && (message === "E-mail exists. Sign In")) {
                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList?.remove('signup_error');
                errMsg?.classList?.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList?.remove('error-message-info');
                    errMsg?.classList?.add('signup_error');
                }, 3000);
                // Perform These Actions
            } else if ((!success) && (message === "Username exists. Sign In")) {
                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList?.remove('signup_error');
                errMsg?.classList?.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList?.remove('error-message-info');
                    errMsg?.classList?.add('signup_error');
                }, 3000);
                // Perform These Actions                  
            } else {             
                // Scroll to Top
                window.scrollTo({ left: 0, top: 300, behavior: 'smooth', });

                // Perform These Actions                
                setFormSubmitted(success);
                console.log("Sign Up Data: ", data);
                setFormMessage(message);

                // Store Token in LocalStorage 
                const jsonObjData = {
                    token: data?.token,
                };
                localStorage.setItem("token", JSON.stringify(jsonObjData));

                // RESET FORM AFTER SUBMISSION
                document.getElementById("verifySignUpForm").reset();

                successMsg?.classList.remove('signup_success');
                successMsg?.classList.add('success-message-info'); 
                                    
                setTimeout(() => {
                    successMsg?.classList?.remove('success-message-info');
                    successMsg?.classList?.add('signup_success');            
                }, 3500);
               
                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
                }, 3900);
                // Perform These Actions
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };
    // *********************************************** //
    // *********************************************** //
    



    
    // ******************************************************* //
    // *** MANAGE STATE:  FOR REGISTERED USER VERIFICATION *** //
    // ******************************************************* //
    const [registeredUser, setRegisteredUser] = useState(null);
    // console.log("Registered User: ", registeredUser);    
    const [verificationSuccessful, setVerificationSuccessful] = useState(false);
    // console.log("verification Successful: ", verificationSuccessful);
    const [verificationMessage, setVerificationMessage] = useState("");
    // console.log("verification Message: ", verificationMessage);
    // ******************************** //
    // **** VERIFY REGISTERED USER **** //
    // ******************************** //
    // useEffect(() => {   

    //     // Assuming the token is passed as a query parameter
    //     console.log("CURRENT LOCATION OF URL SEARCH: ", window.location.search);
       
    //     const search = window.location.search;
    //     const queryParams = new URLSearchParams(search);        
        
    //     const token = queryParams.get('token'); 
    //     console.log("Token: ", token);            

    //     async function verifyToken() {

    //         const uri = "/user/verify";
    //         await api.get(uri, { 
    //             headers: { 
    //                Authorization: `Bearer ${token}`,
    //             }, 
    //             params: { 
    //                token 
    //             }, 
    //         })
    //         .then((response) => {
    //             const { success, message, data } = response.data;
    //             let verifyErrMsg = document.querySelector('#verifySignUpForm .verify_error');
    //             let verifySuccessMsg = document.querySelector('#verifySignUpForm .verify_success');           

    //             if ((!success) && (message === "Unauthorized")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);

    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList.remove('verify_error');
    //                 verifyErrMsg?.classList.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList.remove('error-message-info');
    //                     verifyErrMsg?.classList.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions
    //             } else if ((!success) && (message === "Token has expired")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);

    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList.remove('verify_error');
    //                 verifyErrMsg?.classList.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList.remove('error-message-info');
    //                     verifyErrMsg?.classList.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions
    //             } else if ((!success) && (message === "Token does not exist")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);   
                    
    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList?.remove('verify_error');
    //                 verifyErrMsg?.classList?.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList?.remove('error-message-info');
    //                     verifyErrMsg?.classList?.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions               
    //             } else if ((!success) && (message === "Mulitple User entry")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);      
                    
    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList.remove('verify_error');
    //                 verifyErrMsg?.classList.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList.remove('error-message-info');
    //                     verifyErrMsg?.classList.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions         
    //             } else if ((!success) && (message === "Token is not valid")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);      
                    
    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList.remove('verify_error');
    //                 verifyErrMsg?.classList.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList.remove('error-message-info');
    //                     verifyErrMsg?.classList.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions   
    //             } else if ((!success) && (message === "Invalid account")) {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 setVerificationMessage(message);      
                    
    //                 // Scroll to Top
    //                 window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

    //                 verifyErrMsg?.classList?.remove('verify_error');
    //                 verifyErrMsg?.classList?.add('error-message-info');

    //                 setTimeout(() => {
    //                     verifyErrMsg?.classList?.remove('error-message-info');
    //                     verifyErrMsg?.classList?.add('verify_error');
    //                 }, 3000);
    //                 // Perform These Actions  
    //             } else {
    //                 // Perform These Actions
    //                 setVerificationSuccessful(success);
    //                 console.log("VERIFIED USER DATA: ", data);
    //                 setRegisteredUser(data);
    //                 setVerificationMessage(message);

    //                 // navigate('/user/login');

    //                 // Scroll to Bottom
    //                 window.scrollTo({ left: 0, top: 300, behavior: 'smooth', });

    //                 verifySuccessMsg?.classList?.remove('verify_success');
    //                 verifySuccessMsg?.classList?.add('success-message-info');
                                        
    //                 setTimeout(() => {
    //                     verifySuccessMsg?.classList?.remove('success-message-info');
    //                     verifySuccessMsg?.classList?.add('verify_success');            
    //                 }, 3800);
                    
    //                 setTimeout(() => {
    //                     window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
    //                 }, 3900);
    //                 // Perform These Actions
    //             };
    //         })
    //         .catch((error) => {
    //             console.log("Error encountered: ", error);
    //         });


    //         // const payload = { 
    //         //     accessToken: token,
    //         // };    
    //         // const uri = `/user/verify/${token}`;
    //         // await api.post(uri, payload, {
    //         //     headers: {
    //         //         Authorization: `Bearer ${token}`,
    //         //     },
    //         // })
    //     };
    //     verifyToken();
        
    //     // Dependency array includes location.search to re-run effect if URL changes
    // }, [window.location.search]);
        
    // ******************************** //
    // ****** SET PAGE TITLE(SEO) ***** //
    // ******************************** //
    useEffect(() => {
        const pageTitle = "Account Verification", siteTitle = "Samuel Akinola Foundation";
        if (!(registeredUser?.email)) {
            document.title = `${pageTitle} | ${siteTitle}`;  
        } else {
            document.title = `${pageTitle} (${registeredUser?.email}) | ${siteTitle}`;  
        };
    }, [registeredUser]);
    // ******************************************************* //
    // ******************************************************* //  


    




    return (
        <div id="loginId" className="block h-screen w-full bg-skin-signup-signin-bg">
            {/* ADD ton Below:  right-pane */}
            <div className="flex flex-col justify-center gap-4 relative bg-skin-signup-signin-bg"> 

                {/* PAGE NAV */}
                <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
                    <Link className="w-56" to={"/"}>
                        <img src={brandOfficialLogoDark} alt="brand logo" />
                    </Link>
                </div>
                {/* PAGE NAV */}

                <form id="verifySignUpForm" className='max-w-[400px] w-full mx-auto mb-10 rounded-lg bg-skin-signup-signin-bg py-8 px-10' onSubmit={handleFormSubmission}>
                                            
                    {/* PAGE ICON */}
                    <div className="flex justify-center">
                        <img className="h-44 w-48" src={signUpIcon} alt="user-img" />
                    </div>
                    {/* PAGE ICON */}


                    {/* PAGE TITLE */}
                    <h2 className='text-2xl dark:text-white font-bold text-center mt-0 mb-24 uppercase opacity-30'>sign up</h2>
                    {/* PAGE TITLE */}

                    
                    {/* Sign Up Error Message */}
                    {
                        formSubmitted ?
                            <div></div>
                            :
                            <div className="mx-auto signup_error">
                                {formMessage}
                            </div>
                    }
                    {/* Sign Up Error Message */}


                    {/* Verification Error Message */}
                    {
                        verificationSuccessful ?
                            <div></div>
                            :
                            <div className="mx-auto verify_error">
                                {verificationMessage}
                            </div>
                    }
                    {/* Verification Error Message */}


                    {/* Username */}
                    {/* <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="username">Username
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                        </label>
                    </div> */}
                    {/* Username */}
                    

                    {/* First & Last Name */}
                    <div className='flex flex-row text-gray-400 py-2 gap-12'>
                        <label htmlFor="firstName">First Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="firstName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>

                        <label htmlFor="lastName">Last Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="lastName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* First & Last Name */}

                    
                    {/* E-mail Address */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="email">E-mail address
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* E-mail Address */}


                    {/* Password */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password
                            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* Password */}


                    {/* Approves TandC */}
                    <div className="text-white pt-6 pb-0">{/* text-gray-400 */}
                        <label className="flex justify-center items-center gap-2 leading-6" htmlFor="approvesTandC">
                            {/* ref={checkboxInput} */}
                            <input className="mr-2 w-8 h-8" type="checkbox" name="approvesTandC" onChange={handleOnChange} onKeyUp={handleOnKeyUp} /> I have read and understood Samuel Akinola Foundation's terms and conditions.
                        </label>
                    </div>
                    {/* Approves TandC */}
                    
  
                    {/* SUBMIT BUTTON */}
                    <div className="relative">
                        {/* Verification Success Message */}
                        {
                            verificationSuccessful ?
                                <div className="mx-auto absolute top-0 w-full verify_success">
                                    <div className="text-white font-bold text-2xl flex justify-center items-center py-4 animate-dropdown">
                                        {verificationMessage}
                                    </div>
                                </div>
                                :
                                <div></div>
                        }
                        {/* Verification Success Message */}

                        <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase">submit</button>
                    </div>
                    {/* SUBMIT BUTTON */}


                    {/* LINK: SIGN IN & PASSWORD RESET */}
                    <div className="login__register flex flex-col mt-4 mb-6 gap-4">
                        <p className="text-white">Have an account? <Link className='capitalize' to={"/user/login"}>sign in</Link></p>
                        <p className="text-white"><Link to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                    {/* LINK: SIGN IN & PASSWORD RESET */}


                    {/* Sign Up Success Message */}
                    {
                        formSubmitted ?
                            <div className="mt-6 mx-auto signup_success">
                                {formMessage}
                            </div>       
                            :
                            <div className="mt-6 mx-auto signup_success"></div>
                    }
                    {/* Sign Up Success Message */}
                </form>
            </div>
        </div>
    );
};

export default VerifySignUp;