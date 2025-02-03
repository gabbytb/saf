import { useState, useEffect, } from 'react';
import { 
    useGoogleLogin,
} from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import googleApi from '../googleApi';
import { Preloader } from '../components';
import { GoogleIcon } from '../assets/icons';
import { brandOfficialLogoDark, signUpIcon } from '../assets/images';
import setNigerianTime from '../middlewares/setNigerianTime';



// ********************************** //
// ***         LOG: EVENT         *** // 
// ********************************** //
const logEvent = (message, mode = 'TRACKER') => {        
    // Send the log to a backend server  
    api.post('/api/logs', {
        message,
        mode: mode.toLowerCase(),
        timestamp: setNigerianTime(),
    });
};
// ********************************* //
// ********************************* //







const SignIn = () => {

    
    const navigate = useNavigate();
    const [loginFormMessage, setLoginFormMessage] = useState(null);
    // console.log("Login Attempt: ", loginFormMessage);
   

    
    
    // ***************************************************************************
    // *** SET PAGE TITLE(SEO) *** //
    // ***************************************************************************       
    const checkLoggedOut = localStorage?.getItem("logout");
    useEffect(() => {    
        if (checkLoggedOut === "You are Logged out") {
            window.scrollBy({ top: 0, left: 0, behaviour: "smooth" });
            const pageTitle = "Logged Out", 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;
            logEvent(checkLoggedOut);
                        
            setTimeout(() => {
                localStorage?.removeItem("logout");
            }, 800);
        } else {
            window.scrollBy({ top: 0, left: 0, behaviour: "smooth" });
            const pageTitle = "Sign-In", 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;                  
            logEvent(`User visited ${pageTitle} page`);    
        };
    }, [checkLoggedOut]);



    // ***************************************************************************
    // FUNCTION:-  Re-direct LOGGED-IN USERS from Sign-In page to Dashboard
    // ***************************************************************************
    useEffect(() => {        
        redirToDashboardIfUserLoggedIn();
    }, []); 
    function redirToDashboardIfUserLoggedIn() {  
        if (JSON?.parse(localStorage?.getItem("user"))) {               
            logEvent(`User was redirected to Admin Dashboard`);
            navigate("/admin/dashboard");  
        };
    };
    // ***************************************************************************    
    // ***************************************************************************




    


    
    // *************************************** //
    // *********   GOOGLE: SIGN-IN   ********* //
    // *************************************** //
    // new Date(verifiedToken.exp * 1000);
    const [googleUser, setGoogleUser] = useState([]);
    // console.log("Gmail Account attempting to Login: ", googleUser);
    
    const [profile, setProfile] = useState([]);
    // console.log("Google Profile: ", profile);
    
    const [isLoggedInWithGmail, setIsLoggedInWithGmail] = useState(false);
    // console.log("Gmail Login Successful: ", isLoggedInWithGmail);

    useEffect(() => {      
        if (googleUser.length !== 0) {
            googleApi.get(`/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
                headers: {
                    Authorization: `Bearer ${googleUser.access_token}`,
                    Accept: 'application/json'
                },
            })
            .then((response) => {               
                setProfile(response.data);
            })
            .catch((error) => console.log("Failed Google Login: ", error));
        };
    }, [googleUser]);
   
    useEffect(() => {
        if (profile?.length !== 0) {
            const uri = "/api/v1/auth/gmail/login";
            const payload = {
                'email': profile.email,
            };

            api.post(uri, payload)
            .then((response) => {
                const { success, data, message } = response.data;
                var ssoLinksHr = document.querySelector("#logInForm .alt_sso_hr");
                var successMsg = document.querySelector('#logInForm .success');
                var ssoLinks = document.querySelector("#logInFormId .alt_sso");
                     
                if (!success && message === "No user found") {
                    setIsLoggedInWithGmail(success);
                    setLoginFormMessage(message);

                    // ssoLinksHr?.classList.remove("hidden");
                    // ssoLinks?.classList.add("flex");
                    // ssoLinks?.classList.remove("hidden");
                } else {
                    // Perform These Actions                  
                    window.scrollTo({ left: 0, top: 280, behavior: "smooth" });
                    
                    ssoLinksHr?.classList.add("hidden");
                    ssoLinks?.classList.remove("flex");
                    ssoLinks?.classList.add("hidden");

                    setLoginFormMessage(message);
                    setIsLoggedInWithGmail(success);
                            
                    let loggedInUser = {
                        id: data.id,
                        first_name: data.first_name,
                        last_name: data.last_name,                  
                        user_name: data.email,             
                        access_token: data.access_token,            
                        expires_at: data.expires_at, 
                        status: data.status,
                        roles: [data?.roles],
                        approves_T_and_C: data.approves_T_and_C,     
                        is_verified: data.is_verified,
                        about_me: data.about_me,
                        display_img: profile?.picture,                 
                    };
                    localStorage?.removeItem("logout");    
                    // localStorage?.removeItem("twk_644562484247f20fefed482e");
                    localStorage.setItem("user", JSON.stringify(loggedInUser));                   

                    successMsg?.classList.remove('success');
                    successMsg?.classList.add('success-message-info');

                    setTimeout(() => {
                        successMsg?.classList.remove('success-message-info');
                        successMsg?.classList.add('success');
                    }, 2500);

                    setTimeout(() => {
                        navigate("/admin/dashboard");
                    }, 2800);
                    // Perform These Actions
                };
            })
            .catch((error) => {
                console.log("Encountered unexpected error: ", error);
            });
        };    
    }, [profile]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed: ', error)
    });


 

    
    // *************************************** //
    // *** USER PAYLOAD FOR NORMAL SIGN IN *** //
    // *************************************** //   
    const [user, setUser] = useState({ email: "", password: "", });
    // console.log("Login Attempt By: ", user.email);

    const [userProfile, setUserProfile] = useState(undefined);
    // console.log("LoggedIn User Profile: ", userProfile);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // console.log("Login Successful: ", isLoggedIn);

    async function handleKeyUp(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleLogin(e) {
        e.preventDefault();
       
        if (user?.email !== "") {

            const uri = "/api/v1/auth/login";
            const payload = {
                'email': user?.email,
                'password': user?.password,
            };

            await api.post(uri, payload)
            .then((response) => {
                const { success, message, data } = response.data;
                var errMsg = document.querySelector('#logInForm .error'); 
                var successMsg = document.querySelector('#logInForm .success');
                var ssoLinks = document.querySelector("#logInFormId .alt_sso");
                var ssoLinksHr = document.querySelector("#logInForm .alt_sso_hr");
                                
                if (!success && message === "Account with this details does not exist") {              
                    // Perform These Actions
                    setIsLoggedIn(success);
                    setLoginFormMessage(message);
                    
                    errMsg?.classList.remove('error');
                    errMsg?.classList.add('error-message-info');

                    setTimeout(() => {
                        errMsg?.classList.remove('error-message-info');
                        errMsg?.classList.add('error');
                    }, 2500);
                    // Perform These Actions
                } else if (!success && message === "Incorrect password") {
                    // Perform These Actions
                    setIsLoggedIn(success);
                    setLoginFormMessage(message);         

                    errMsg?.classList.remove('error');
                    errMsg?.classList.add('error-message-info');

                    setTimeout(() => {
                        errMsg?.classList.remove('error-message-info');
                        errMsg?.classList.add('error');
                    }, 2500);
                    // Perform These Actions
                } else if (!success && message === "Kindly verify your account") {
                    // Perform These Actions
                    setIsLoggedIn(success);
                    setLoginFormMessage(message);

                    errMsg?.classList.remove('error');
                    errMsg?.classList.add('error-message-info');

                    setTimeout(() => {
                        errMsg?.classList.remove('error-message-info');
                        errMsg?.classList.add('error');
                    }, 2500);

                    setTimeout(() => {
                        var loginFormId = document.querySelector("#logInFormId");
                        loginFormId?.classList?.add("opacity-30");

                        var signUpModal = document.querySelector("#verifyId");                       
                        if (signUpModal?.classList?.contains("hidden")) {
                            signUpModal?.classList?.remove("hidden");
                            signUpModal?.classList?.add("fixed");
                            signUpModal?.classList?.add("ease-out-anime");
                        };
                    }, 3200);
                    // Perform These Actions
                } else {
                    // Perform These Actions       
                    setIsLoggedIn(success);                                
                    setUserProfile(data);
                    setLoginFormMessage(message);

                    localStorage?.removeItem("logout");
                    // localStorage?.removeItem("twk_644562484247f20fefed482e");
                    localStorage?.setItem("user", JSON.stringify(data));

                    ssoLinks?.classList.add("hidden");
                    ssoLinksHr?.classList.add("hidden");
                                    
                    successMsg?.classList.remove('success');
                    successMsg?.classList.add('success-message-info');

                    setTimeout(() => {
                        successMsg?.classList.remove('success-message-info');
                        successMsg?.classList.add('success');
                    }, 2500);
                
                    setTimeout(() => {
                        navigate("/admin/dashboard");
                    }, 2800);
                    // Perform These Actions
                };
            })
            .catch((error) => {
                console.log("Error encountered: ", error);
            });
        };
    };

   



    // ************************************** //
    // *** USER PAYLOAD FOR RE-VALIDATION *** //
    // ************************************** //
    async function closeModal() {
        var loginFormId = document.querySelector("#logInFormId");
        loginFormId?.classList?.remove("opacity-30");

        var signUpModal = document.querySelector("#verifyId");
        if (signUpModal?.classList?.contains("fixed")) {
            signUpModal?.classList?.remove("fixed");
            signUpModal?.classList?.add("hidden");
        };
    };

    const [formMessageAccountVerification, setFormMessageAccountVerification] = useState(null);
    // console.log("Account Verification Attempt: ", formMessageAccountVerification);

    // eslint-disable-next-line    
    const [formSubmittedAccountVerification, setFormSubmittedAccountVerification] = useState(false);    
    // console.log("Account Verification Submission Attempt: ", formSubmittedAccountVerification);

    async function handleVerification(e) {
        e.preventDefault();
       
        const url = "/api/v1/admin/users/manage/account/verify";
        const payload = {
            email: user?.email,
        };

        await api.post(url, payload)
        .then((response) => {
            const { success, message } = response.data;
            var errVerifyMsg = document.querySelector('#loginId .reverify_error'); 
            var successVerifyMsg = document.querySelector('#loginId .reverify_success');

            if (!success && message === "No match found") {
                // Perform These Actions
                setFormSubmittedAccountVerification(success); 
                setFormMessageAccountVerification(message);
                    
                errVerifyMsg?.classList.remove('reverify_error');
                errVerifyMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errVerifyMsg?.classList.remove('error-message-info');
                    errVerifyMsg?.classList.add('reverify_error');
                }, 2800);
                // Perform These Actions
            } else {
                // Perform These Actions
                setFormSubmittedAccountVerification(success);
                // setExistingUser(data);
                setFormMessageAccountVerification(message);   
                
                successVerifyMsg?.classList.remove('reverify_success');
                successVerifyMsg?.classList.add('success-message-info');

                setTimeout(() => {
                    successVerifyMsg?.classList.remove('success-message-info');
                    successVerifyMsg?.classList.add('reverify_success');
                }, 2500);
                // Perform These Actions
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };




    


    return (
        <div id="loginId" className="block h-screen w-full bg-skin-signup-signin-bg">
           
            {/* Login Form */}
            <div id="logInFormId" className="flex flex-col justify-center gap-10 relative bg-skin-signup-signin-bg"> 

                {/* PAGE NAV */}
                <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
                    <Link className="w-56" to={"/"}>
                        <img src={brandOfficialLogoDark} alt="logo" />
                    </Link>
                </div>
                {/* PAGE NAV */}



                {/* Sign-In Methods */}
                <form id="logInForm" onSubmit={handleLogin} className='max-w-[400px] w-full mx-auto mb-0 rounded-lg bg-skin-signup-signin-bg pt-2 pb-0 px-8 z-1'>
                    
                    {/* PAGE ICON */}
                    <div className="flex justify-center">
                        <img className="h-44 w-48" src={signUpIcon} alt="user-img" />
                    </div>
                    {/* PAGE ICON */}


                    {/* PAGE TITLE */}
                    <h2 className='text-2xl dark:text-white font-bold text-center mt-0 mb-16 uppercase opacity-30'>sign in</h2>
                    {/* PAGE TITLE */}


                    {/* Error Message */}
                    <div className="mx-auto error">
                        {loginFormMessage}
                    </div>
                    {/* Error Message */}


                    {/* E-mail Address */}
                    <div className="flex flex-col text-gray-400 py-2">
                        <label htmlFor="email">E-mail address
                            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" name="email" onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    {/* E-mail Address */}


                    {/* Password */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password
                            <input autoComplete="new-password" className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    {/* Password */}

                
                    {/* LINK: REMEMBER ME & PASSWORD RESET */}
                    <div className='flex justify-between py-2'>{/* text-gray-400 */}
                        <p className='flex items-center text-white'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p><Link className='text-white' to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                    {/* LINK: REMEMBER ME & PASSWORD RESET */}

                    
                    {/* SUBMIT BUTTON */}
                    <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase'>sign in</button>
                    {/* SUBMIT BUTTON */}


                    {/* LINK: SIGN UP */}
                    <div className="text-white login__register">
                        Don't have an account? <Link className='capitalize' to={"/user/signup"}>sign up</Link>
                    </div>
                    {/* LINK: SIGN UP */}
                    
                    
                    <hr className="alt_sso_hr mt-10 mb-0"></hr>

                    {/* Success Message */}
                    <div className="mt-6 mx-auto success">
                        <Preloader text={loginFormMessage}/>
                    </div>
                    {/* Success Message */}

                </form>
                {/* Sign-In Methods */}



                {/* Alternative Sign-In Methods */}
                <div className="alt_sso flex justify-center align-middle pb-12 mb-20 gap-10">
                    <div className="w-full flex justify-center px-8">
                        <button className="w-123.3 hover:outline-none focus:outline-none" onClick={() => login()}>
                            <div className="flex flex-wrap justify-center gap-3 bg-white hover:bg-cyan-500 focus:bg-cyan-500 hover:ease-in-out hover:duration-150 hover:text-white text-black text-15xl tracking-extratight font-medium items-center py-3 px-12 rounded-full">
                                Sign In with Google <span className="w-8 h-8"><GoogleIcon /></span>
                            </div>
                        </button>                                   
                    </div>
                </div>
                {/* Alternative Sign-In Methods */}

            </div>
            {/* Login Form */}

            

            {/* Re-verify Email Modal */}
            <div id="verifyId" className="hidden inset-0 backdrop-blur-sm bg-opacity-5 h-screen w-screen signup__modal">
                <div className="grid place-content-center items-center h-full">
                    <div className="flex flex-col items-end gap-4">
                        <button className="text-white font-black text-2xl right-0" onClick={closeModal}>X</button>
                        <div className="bg-gray-800 flex flex-col justify-center gap-16 rounded-lg right-pane">             
                            

                            <form id="verifyForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                                
                                {/* PAGE TITLE */}
                                <h2 className='text-4xl dark:text-white font-bold text-center mt-4 mb-6'>Verify account</h2>                            
                                {/* PAGE TITLE */}


                                {/* E-mail Address */}
                                <div className="flex flex-col text-gray-400 py-2">
                                    <label htmlFor="email">E-mail address
                                        <input 
                                            className="rounded-lg
                                                bg-gray-700 
                                                mt-2 
                                                p-2 
                                                focus:border-blue-500 
                                                focus:bg-gray-800 
                                                focus:outline-none"
                                            type="email"
                                            name="email"
                                            value={user?.email} 
                                            // onChange={handleOnChange} 
                                            disabled 
                                        />
                                    </label>
                                </div>
                                {/* E-mail Address */}


                                {/* SUBMIT BUTTON */}
                                <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase" onClick={handleVerification}>Verify email</button>
                                {/* SUBMIT BUTTON */}


                                {/* lINK: LOGIN */}
                                <div className="text-white login__register">
                                    Have an account? <Link className="capitalize cursor-pointer" onClick={closeModal}>sign in</Link>
                                </div>
                                {/* lINK: LOGIN */}


                                {/* VERIFICATION Success Message */}
                                <div className="mt-6 mx-auto reverify_success">
                                    {formMessageAccountVerification}
                                </div>
                                {/* VERIFICATION Success Message */}
                            </form>


                        </div>
                    </div>
                </div>
            </div>
            {/* Re-verify Email Modal */}
            
        </div>
    );

};


export default SignIn;










// return (
//     <div id="loginId" className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
         

//         {/* <div className='hidden sm:block left-pane relative'>               
//             <div className="relative h-full">
//                 <div className="flex justify-center items-center w-full h-30 bg-white px-8">
//                     <Link className="w-56" to={"/"}><img src={brandOfficialLogo} /></Link>
//                 </div>
    
//                 <img className="w-full h-full object-cover absolute top-0 -z-3" src={loginImg} alt="background-img" />
//             </div>
//         </div> */}


//         <div className="flex flex-col justify-center items-center gap-8 w-full h-30 bg-white px-8">
//             <Link className="w-80" to={"/"}>`
//                 <img src={brandOfficialLogo} />
//             </Link>
//             <h1 className="text-2xl/6 -tracking-supertight font-black italic un">Reaching out to Great Minds.</h1>
//         </div>

//         <div className='bg-skin-signup-signin-bg flex flex-col justify-center gap-16 right-pane relative'>             
//             <form id="logInForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-skin-signup-signin-bg p-8 px-8 z-1' onSubmit={handleLogin}>
                
//                 {/* PAGE ICON */}
//                 <div className="flex justify-center">
//                     <img className="h-32 w-36" src={loginBg} alt="user-img" />
//                 </div>
//                 {/* PAGE ICON */}


//                 {/* PAGE TITLE */}
//                 <h2 className='text-4xl dark:text-white font-bold text-center mt-0 mb-16 uppercase opacity-30'>sign in</h2>
//                 {/* PAGE TITLE */}


//                 {/* Error Message */}
//                 <div className="mx-auto error">
//                     {formMessage}
//                 </div>
//                 {/* Error Message */}


//                 {/* E-mail Address */}
//                 <div className="flex flex-col text-gray-400 py-2">
//                     <label htmlFor="email">E-mail address
//                         <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" name="email" onChange={handleChange} onKeyUp={handleKeyUp} />
//                     </label>
//                 </div>
//                 {/* E-mail Address */}


//                 {/* Password */}
//                 <div className='flex flex-col text-gray-400 py-2'>
//                     <label htmlFor="password">Password
//                         <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleChange} onKeyUp={handleKeyUp} />
//                     </label>
//                 </div>
//                 {/* Password */}

            
//                 {/* LINK: REMEMBER ME & PASSWORD RESET */}
//                 <div className='flex justify-between py-2'>{/* text-gray-400 */}
//                     <p className='flex items-center text-white'><input className='mr-2' type="checkbox" /> Remember Me</p>
//                     <p><Link className='text-white' to={"/user/password-reset"}>Forgot Password</Link></p>
//                 </div>
//                 {/* LINK: REMEMBER ME & PASSWORD RESET */}

                
//                 {/* SUBMIT BUTTON */}
//                 <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase'>sign in</button>
//                 {/* SUBMIT BUTTON */}


//                 {/* LINK: SIGN UP */}
//                 <div className="text-white login__register">
//                     Don't have an account? <Link className='capitalize' to={"/user/signup"}>sign up</Link>
//                 </div>
//                 {/* LINK: SIGN UP */}


//                 {/* Success Message */}
//                 <div className="mt-6 mx-auto success">
//                     {formMessage}
//                 </div>
//                 {/* Success Message */}
//             </form>
//         </div>

        
//         {/* Signup Modal */}
//         <div id="verifyId" className="hidden inset-0 backdrop-blur-sm bg-opacity-5 h-screen w-screen signup__modal">
//             <div className="grid place-content-center items-center h-full">
//                 <div>
//                     <div className="bg-gray-800 flex flex-col justify-center gap-16 rounded-lg right-pane">             
                        

//                         <form id="verifyForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                            
//                             {/* PAGE TITLE */}
//                             <h2 className='text-4xl dark:text-white font-bold text-center mt-4 mb-6'>Verify account</h2>                            
//                             {/* PAGE TITLE */}


//                             {/* E-mail Address */}
//                             <div className="flex flex-col text-gray-400 py-2">
//                                 <label htmlFor="email">E-mail address
//                                     <input 
//                                         className="rounded-lg
//                                             bg-gray-700 
//                                             mt-2 
//                                             p-2 
//                                             focus:border-blue-500 
//                                             focus:bg-gray-800 
//                                             focus:outline-none"
//                                         type="email"
//                                         name="email"
//                                         value={existingUser?.email} 
//                                         onChange={handleOnChange} 
//                                         disabled 
//                                     />
//                                 </label>
//                             </div>
//                             {/* E-mail Address */}


//                             {/* SUBMIT BUTTON */}
//                             <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase" onClick={handleVerification}>Verify email</button>
//                             {/* SUBMIT BUTTON */}


//                             {/* lINK: LOGIN */}
//                             <div className="text-white login__register">
//                                 Have an account? <Link className="capitalize cursor-pointer" to={"/user/login"}>sign in</Link>
//                             </div>
//                             {/* lINK: LOGIN */}


//                             {/* VERIFICATION Success Message */}
//                             <div className="mt-6 mx-auto verify__success">
//                                 {formMessageAccountVerification}
//                             </div>
//                             {/* VERIFICATION Success Message */}
//                         </form>


//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* Signup Modal */}

//     </div>
// );