import { useState, useEffect, } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api';
import { brandOfficialLogoDark, signUpIcon } from '../assets/images';
import setNigerianTime from '../middlewares/setNigerianTime';









function SignUp() {  


    const { search } = useLocation();    
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



    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Sign Up", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;

        logEvent('User visited Sign-Up page');
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", approvesTandC: false, });
    const [accountCreated, setAccountCreated] = useState(null);    
    // console.log("*** NEW ACCOUNT CREATED ***\nUser: ", accountCreated);
    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //


    
    // ************************************************** //
    // ** MANAGE STATE OF:- FORM RESPONSE DATA *** //
    // ************************************************** //    
    const [formMessage, setFormMessage] = useState(null);
    console.log("SIGN UP Attempt: ", formMessage);

    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("SIGN UP Successful: ", formSubmitted);

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
            var errMsg = document.querySelector('#signUpForm .signup_error'); 
            var successMsg = document.querySelector('#signUpForm .signup_success');
            var reduceSpaceBtwForgotPasswordAndSuccessMsg = document.querySelector('#signUpForm .login__register');

            if ((!success) && (message === "Fill all the required inputs")) {

                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                   
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions

            } else if ((!success) && (message === "E-mail exists. Sign In")) {
 
                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions

            } else if ((!success) && (message === "Username exists. Sign In")) {
   
                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions
                                
            } else {             
                // Perform These Actions
                setFormSubmitted(success);     
                setFormMessage(message);                     
                setAccountCreated(data);
                
                // RESET FORM AFTER SUBMISSION
                document.getElementById("signUpForm").reset();
                
                reduceSpaceBtwForgotPasswordAndSuccessMsg.classList.remove('mb-6');
                reduceSpaceBtwForgotPasswordAndSuccessMsg.classList.add('mb-3');
    
                successMsg.classList.remove('signup_success');
                successMsg.classList.add('success-message-info'); 
                                    
                // Scroll to Bottom
                window.scrollTo({ left: 0, top: 1200, behavior: 'smooth', });

                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('signup_success');            
                }, 3500);
                // Perform These Actions

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

    // useEffect(() => {
    //     // function setTokenInStorage() {
    //         // if (accessToken !== null) {
    //         //     const jsonObjData = {
    //         //         token: accessToken,
    //         //     };
    //         //     localStorage.setItem("tokEn", JSON.stringify(jsonObjData));
    //         // };
    //     // };
    //     // setTokenInStorage();

    //     // Function to set a cookie    
    //     function setCookie(name, value, days) {
    //         let expires = "";
    //         if (days) {
    //             const date = new Date();
    //             date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    //             expires = "; expires=" + date.toUTCString();
    //         };
    //         const objToken = {
    //             token: value,
    //         };
    //         document.cookie = name + "=" + (JSON.stringify(objToken) || "") + expires + "; path=/";
    //     };
    //     setCookie("cookieToken", accessToken, 2);
    // }, [accessToken]);
    // ************************************************** //
    // ** MANAGE STATE OF:- TOKEN, FROM RESPONSE DATA *** //
    // ************************************************** //



    
    useEffect(() => {
        
        var successMsg = document.querySelector('#signUpForm .signup_success');
                
        const query = new URLSearchParams(search);
        const message = query.get('message');
        const verified = query.get('verified');
        const token = query.get('token');
        const email = query.get('email');
        
        console.log("TOKEN: ", token);
        console.log("EMAIL: ", email);
        console.log("VERIFIED: ", verified);
        console.log("MESSAGE: ", message);
        
        setFormMessage(message);

        if (message === "successful" && verified !== null && token !== null) {
            successMsg.classList.remove('signup_success');
            successMsg.classList.add('success-message-info');

            // Scroll to Bottom
            window.scrollTo({ left: 0, top: 1200, behavior: 'smooth', });

            setTimeout(() => {
                successMsg.classList.remove('success-message-info');
                successMsg.classList.add('signup_success');            
            }, 3500);
            // Perform These Actions

            setTimeout(() => {
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
            }, 3900);
            // Perform These Actions
        };
    }, [search]);
    // ************************************************** //
    // ** MANAGE STATE OF:- VERIFY TOKEN AFTER SIGNUP *** //
    // ************************************************** //  






    return (
        <div id="signUpId" className="block h-screen w-full bg-skin-signup-signin-bg">
            

            {/* ADD to Below:  right-pane */}
            <div className="flex flex-col justify-center gap-4 relative bg-skin-signup-signin-bg"> 


                {/* PAGE NAV */}
                <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
                    <Link className="w-56 block dark:block" to={"/"}>
                        <img src={brandOfficialLogoDark} alt="brand logo" />
                    </Link>
                </div>
                {/* PAGE NAV */}


                <div class="flex justify-center items-center w-full px-8">

                    {/* SIGN-UP FORM */}
                    <form id="signUpForm" className='max-w-[400px] border flex flex-col bg-white w-full mx-auto mt-14 mb-12 rounded-3xl bg-skin-signup-signin-bg pt-2 pb-10 px-10' onSubmit={handleFormSubmission}>

                                            
                    {/* PAGE ICON */}
                    <div className="flex justify-center">
                        <img className="w-36 h-32 rounded-full" src={signUpIcon} alt="user-img" />
                    </div>
                    {/* PAGE ICON */}


                    {/* PAGE TITLE */}
                    {/* mb-24 */}
                    <h2 className='text-2xl text-black dark:text-white font-bold text-center mt-0 mb-6 uppercase opacity-100'>sign up</h2>
                    {/* PAGE TITLE */}

                    
                    {/* Error Message */}
                    <div className="mx-auto signup_error w-full">
                        {formMessage}
                    </div>
                    {/* Error Message */}


                    {/* Username */}
                    {/* <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="username">Username
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                        </label>
                    </div> */}
                    {/* Username */}
                    

                    {/* First & Last Name */}
                    <div className='flex flex-row text-gray-400 py-2 gap-12'>
                        <label htmlFor="firstName" className='text-lg font-semibold tracking-extratight text-gray-500'>First Name
                            <input className='rounded-none text-black bg-gray-700 ease-in-out duration-150 mt-1 p-2 focus:border-blue-500 outline-none' type="text" name="firstName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>

                        <label htmlFor="lastName" className='text-lg font-semibold tracking-extratight text-gray-500'>Last Name
                            <input className='rounded-none text-black bg-gray-700 ease-in-out duration-150 mt-1 p-2 focus:border-blue-500 outline-none' type="text" name="lastName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* First & Last Name */}

                    
                    {/* E-mail Address */}
                    <div className='text-gray-400 py-4'>
                        <label htmlFor="email" className='text-lg font-semibold tracking-extratight text-gray-500'>E-mail Address
                            <input className='rounded-none text-black bg-gray-700 ease-in-out duration-150 mt-1 p-2 focus:border-blue-500 outline-none' type="email" name="email" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* E-mail Address */}


                    {/* Password */}
                    <div className='text-gray-400 py-1'>
                        <label htmlFor="password" className='text-lg font-semibold tracking-extratight text-gray-500'>Password
                            <input autoComplete="new-password" className='rounded-none text-black bg-gray-700 ease-in-out duration-150 mt-1 p-2 focus:border-blue-500 outline-none' type="password" name="password" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* Password */}


                    {/* Approves TandC */}
                    <div className="text-white pt-4 pb-0">{/* text-gray-400 */}
                        <label className="flex justify-center items-center gap-2 text-lg font-semibold tracking-extratight text-gray-500 leading-6" htmlFor="approvesTandC">
                            {/* ref={checkboxInput} */}
                            <input className="mb-3 mr-2 w-8 h-8" type="checkbox" name="approvesTandC" onChange={handleOnChange} onKeyUp={handleOnKeyUp} /> I have read and understood Samuel Akinola Foundation's terms and conditions.
                        </label>
                    </div>
                    {/* Approves TandC */}
                    

                    {/* SUBMIT BUTTON */}
                    <button className="w-full mt-4 mb-5 py-5 bg-skin-signup-signin-bg shadow-lg shadow-teal-500/50 hover:bg-green-500 focus:bg-green-600 hover:shadow-teal-500/40 duration-150 ease-in-out text-white font-semibold rounded-xl uppercase focus:outline-none">submit</button>
                    {/* SUBMIT BUTTON */}


                    {/* LINK: SIGN IN & PASSWORD RESET */}
                    <div className="login__register flex flex-col mt-2 mb-6 gap-4">
                        <p className="text-center text-xl font-semibold tracking-extratight text-gray-500">Have an account? <Link className='capitalize text-gray-600' to={"/user/login"}>sign in</Link></p>
                        <p className="text-center text-xl font-semibold tracking-extratight"><Link className='capitalize text-gray-600' to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                    {/* LINK: SIGN IN & PASSWORD RESET */}


                    {/* Success Message */}
                    <div className="mt-3 mb-3 mx-auto signup_success">
                        {formMessage}
                    </div>
                    {/* Success Message */}

                    </form>
                    {/* SIGN-UP FORM */}

                </div>
            </div>
            

        </div>
    );
};

export default SignUp;
