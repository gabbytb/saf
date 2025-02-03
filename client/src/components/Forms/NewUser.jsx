import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import api from "../../api";






const NewUser = ({ userRoles }) => {
    

    const navigate = useNavigate();
    function goBack() {    
        for (var i = 0; i < userRoles?.length; i++) {
            if (userRoles[i]?.role === "ROLE_USERS") {
                navigate("/admin/users");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });                 
            } else if (userRoles[i]?.role === "ROLE_STAFF") {
                navigate("/admin/staffs");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });                 
            } else if (userRoles[i]?.role === "ROLE_EDITOR") {
                navigate("/admin/staffs");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });                 
            } else {
                navigate("/admin/staffs");
                window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });
            };
        };       
    };

    const [activeForm, setActiveForm] = useState('create-user-form');
    const [ user, setUser ] = useState({ 
        firstName: '',
        lastName: '',
        email: '', 
        phone: '', 
        address: '', 
        address2: '', 
        city: '', 
        state: '', 
        country: '', 
        postalCode: '', 
        aboutMe: '', 
    });
    console.log("NEW USER: ", user);

    const [formMessage, setFormMessage] = useState(null);
    // console.log("Login Attempt: ", formMessage);

    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Login Successful: ", formSubmitted);

    async function handleChangeUserInfo(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleSubmit(e) {
        e.preventDefault();

        await api.post("/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message } = response.data;
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


   

    return (
        <div id="createAccountID" className="relative flex flex-col min-w-0 break-words xs:w-full lg:w-781 mb-16 shadow-lg rounded-lg bg-blueGray-100 border-0">

            <div className={`activeDisplay ${activeForm === 'create-user-form' ? 'block' : 'hidden'}`}>
                <div className="rounded-t bg-white mb-0 p-6">
                    <div className="text-center flex justify-start items-center gap-6">                                             
                        <button onClick={goBack}
                            className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-xl tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-300"
                            type="button">
                            <span className="flex items-center gap-2">
                                {String.fromCharCode(8592)}
                                <p className="text-lg text-white">Back</p>
                            </span> 
                        </button>

                        <h6 className="text-blueGray-700 text-42xl tracking-tightener font-bold capitalize">create account</h6>                                            
                    </div>
                </div>




                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {/* FORM FOR CREATING USER DATA */}
                    <form id="createUserFormID" onSubmit={handleSubmit}>
                        <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-black uppercase px-4">
                            {/* User Information */}
                        </h6>
                        <div className="flex flex-wrap">
                                                                        
                            {/* First Name */}
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="firstName">
                                        First Name
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                            name="firstName"
                                            onChange={handleChangeUserInfo}                                      
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="lastName">
                                        Last Name     

                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                            
                                            name="lastName"
                                            onChange={handleChangeUserInfo}                                            
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* E-mail */}
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="email">
                                        Email address
                                    
                                        <input
                                            type="email"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                                                          
                                            name="email"
                                            onChange={handleChangeUserInfo}                                                                                                                                    
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className="w-full lg:w-6/12 px-4">
                                <label
                                    className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                    htmlFor="phone">
                                    Phone Number
                                
                                    <input
                                        type="number"
                                        min={0}
                                        className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-white rounded-lg text-xl tracking-verytight shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150 h-168 indent-3 appearance-none"                                  
                                        name="phone"
                                        onChange={handleChangeUserInfo}                                            
                                    />
                                </label>
                            </div>  

                            {/* Password */}
                            <div className="w-full lg:w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="password">
                                        Create password
                                    
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                                                          
                                            name="password"
                                            onChange={handleChangeUserInfo}                                                                                                                                    
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                            Contact Information
                        </h6>
                        <div className="flex flex-wrap">

                            {/* ADDRESS 1 AND 2 */}
                            <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                {/* Address */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="address">
                                        Address

                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                            name="address"
                                            onChange={handleChangeUserInfo}                                              
                                        />
                                    </label>
                                </div>

                                {/* Address 2 */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="address2">
                                        Address 2
                                
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                            name="address2"
                                            onChange={handleChangeUserInfo}                                        
                                        />
                                    </label>
                                </div>
                                
                            </div>

                            {/* CITY AND STATE */}    
                            <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                
                                {/* City */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="city">
                                        City
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                            
                                            name="city"
                                            onChange={handleChangeUserInfo}                                                
                                        />
                                    </label>
                                </div>

                                {/* State */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="state">
                                        State
                                
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                                            name="state"
                                            onChange={handleChangeUserInfo}                                               
                                        />
                                    </label>
                                </div>
                        
                            </div>

                            {/* COUNTRY AND POSTAL CODE */}
                            <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                
                                {/* Country */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="country">
                                        Country
                                
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                                            name="country"
                                            onChange={handleChangeUserInfo}                                                
                                        />
                                    </label>
                                </div>

                                {/* Postal Code */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="postalCode">
                                        Postal Code
                                
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                            name="postalCode"
                                            onChange={handleChangeUserInfo}                                               
                                        />
                                    </label>
                                </div>

                            </div>

                        </div>                              

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                            additional information
                        </h6>
                        <div className="flex flex-wrap">
                            
                            {/* OPTIONAL: ABOUT ME */}
                            <div className="w-full lg:w-12/12 px-4">

                                {/* About Me */}
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="aboutMe">
                                        bio
                                
                                        <textarea
                                            type="text"
                                            className="border-0 py-6 indent-4 mt-1.5 mb-6 placeholder-gray-600 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                            name="aboutMe"
                                            onChange={handleChangeUserInfo}                                              
                                            rows="8">
                                        </textarea>
                                    </label>
                                </div>

                            </div>

                        </div>

                        <div className="rounded-t px-6 mt-4 mb-4">
                            <div className="text-center flex justify-start">
                                <button type="submit"
                                    // onClick={handleSubmit}
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                > Submit</button>
                            </div>
                        </div>
                    </form>
                </div>                   
            </div> 

        </div> 
    );
};

export default NewUser;

