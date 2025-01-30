// components
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import "../../assets/styles/tailwind.css";
import { adminDashboardIcon } from "../../assets/images";
import { FacebookIcon, TwitterIcon, InstagramIcon, TelegramIcon, WhatsappIcon, YoutubeIcon } from "../../assets/icons";







export default function CardAccountDetails({ firstName, displayImg }) {
  
    
    const navigate = useNavigate();
    // ***************************************************************************
    // FUNCTION:-  Re-direct LOGGED-IN USERS from Sign-In page to Dashboard
    // ***************************************************************************
    useEffect(() => {   
        if (!firstName) {
            function redirToSignInIfNotLoggedIn() {                                     
                navigate("/user/login");
            };
            redirToSignInIfNotLoggedIn();
        };
    }, []);



    const [activeForm, setActiveForm] = useState('user-form');
    

  
    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const { id } = useParams(); // console.log("STAFF ID: ", id);
    const [ user, setUser ] = useState({
        first_name: '',
        last_name: '',
        email: '', 
        phone: '', 
        address: '', 
        address2: '', 
        city: '', 
        state: '', 
        country: '', 
        postalCode: '', 
        aboutMe: '',
        socials: [{
            fb: "", xr: "", ig: "", wh: "", pn: "", tk: "", tg: "", yt: "",
        }],
    });    
    // **************************************************************************************************
    // CALL TO API:-  ID TO TRIGGER FUNCTION TO FIND USER BY ID
    // **************************************************************************************************
    useEffect(() => {      
        function findMyUserByID() {
            const url = `/api/v1/auth/account/manage/${id}`;
            api.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                if ((!success) || (message === "User not found")) {
                    console.log("Message: ", message);
                    console.log("Success: ", success);
                };
                            
                // Perform Actions Here if Truthy
                setUser(data);

                // console.log("Success: ", success);
                // console.log("Data: ", data);
                // console.log("Message: ", message);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            });
            // .finally(() => {
            //     setIsLoading(false);    // Always disable loading state, whether successful or not
            // });
        };
        
        var timerID = setTimeout(findMyUserByID, 500);   // Delay execution of findAllUsers by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [id]);
    // console.log("USER INFO to EDIT: ", user);





    // **************************************************************************************************
    // FUNCTION TO RE-DIRECT TO PREVIOUS PAGE BASED ON USER'S ROLE
    // **************************************************************************************************
    const [redirToUserPage, setRedirToUserPage] = useState(true);
    useEffect(() => {      
        function handleRedirectBackTo() {
            for (var i = 0; i < user?.roles?.length; i++) {
                if (user?.roles[i]?.role === 'ROLE_USERS') {
                    setRedirToUserPage(true);                    
                } else {
                    setRedirToUserPage(false);
                };
            };
        };
        handleRedirectBackTo();
    }, [user, redirToUserPage]);
    // *******************************************************************************************//
    // *******************************************************************************************// 


    

    // ON-CLICK:- SHOW UPDATE PAGE
    function showUpdateForm() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        setActiveForm('update-form');
    };
    function deleteUserData() {
        api.delete(`/api/v1/admin/users/manage/delete/${id}`)
        .then((response) => {
            const { success, data, message } = response.data;
            if (!success && message === "User not found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            console.log("Success: ", success);
            console.log("Data: ", data);
            console.log("Message: ", message);
        })
        .catch((error) => {
            console.error("Error encountered: ", error);
        });
    };




    // ON-CLICK:- BACK BUTTON on THE UPDATE PAGE
    // RETURN:- TO USER DETAILS PAGE / STAFF DETAILS PAGE 
    useEffect(() => {
        showUserInfo();
    }, []);
    function showUserInfo() {
        if (id !== null) {    
            for (var i = 0; i < user?.roles?.length; i++) {
                if (user?.roles[i]?.role === 'ROLE_USERS') {            
                    window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });
                    window.location = `/admin/users/${id}`;
                } else {
                    window.scrollBy({ left: 0, top: 0, behavior: 'smooth' });
                    window.location = `/admin/staffs/${id}`;
                };
            };       
        };
    };    

    const [submitUpdate, setSubmitUpdate ] = useState(false);
   


  

    async function handleChangeUserInfo(e) {
        const name = e.target.name,
              value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    // Function to update donation tags
    // Handle changes to Post Image data
    const handleImageChange = (index, e) => {        
        const { name, value } = e.target;
        const newSocials = [...user.socials];
        
        newSocials[index] = {
            ...newSocials[index],
            [name]: value,
        };

        setUser({
            ...user,
            socials: newSocials
        });
    };

    async function handleSubmitUserInfo(e) {
        e.preventDefault();
     
        const uri = `/api/v1/admin/users/manage/update/${id}`;
        await api.put(uri, user)
        .then((response) => {
            const { success, data, message } = response.data;

            if (!success && message === "No match found") { 
                setSubmitUpdate(success);                
                console.log("Success: ", success);
                console.log("Message: ", message);                
            };
          
            setSubmitUpdate(success);
            setUser(data);

            console.log("Success: ", success);
            console.log("Data: ", data);
            console.log("Message: ", message);

            setTimeout(() => {              
                showUserInfo();
            }, 3000);        
        })
        .catch((error) => {
            console.log("Internal server error: ", error);
        });
    };

    useEffect(() => {              
        if (submitUpdate === true) {
            console.log('Update was Submitted: ', submitUpdate); 
            
            function findUpdatedUserID() {             
                const url = `/api/v1/auth/account/manage/${id}`;
                api.get(url)
                .then((response) => {
                    const { success, data, message } = response.data;
                    if (!success || message === "User not found") {
                        console.log("Message: ", message);
                        console.log("Success: ", success);
                    };
                                    
                    // Perform Actions Here if Truthy
                    // console.log("Success: ", success);
                    // console.log("Data: ", data);
                    // console.log("Message: ", message);                        
                    setUser(data);
                })
                .catch((error) => {
                        // Handle error state or logging here
                        console.log("Error encountered: ", error);
                });
            };                    
            findUpdatedUserID();
        };
    }, [id, submitUpdate]);

    





    return (
        <div className="w-full px-4 flex gap-16 flex-row justify-between">
            <div id="accountDetails" className="relative flex flex-col min-w-0 break-words xs:w-full lg:w-781 mb-16">
                <div className={`bg-white activeDisplay ${activeForm === 'user-form' ? 'block' : 'hidden'}`}>
                    <div className="bg-blue-900 mb-16 py-5.8 px-6 border-blue-900 border-0">
                        <div className="text-center flex justify-start items-center gap-6">
                            <Link to={redirToUserPage ? '/admin/users' : '/admin/staffs'}>
                                <button
                                    className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-xl tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300"
                                    type="button">
                                        <span className="flex items-center gap-2">
                                            {String.fromCharCode(8592)}
                                            <p className="text-lg text-white">Back</p>
                                        </span> 
                                </button>
                            </Link>
                            {                 
                                user?.roles?.map((item) => {                                
                                    return (
                                        item?.role === 'ROLE_USERS' ?
                                            <h6 className="text-white text-42xl tracking-tightener font-black capitalize">user Information</h6>  // text-blueGray-700
                                            :
                                            <h6 className="text-white text-42xl tracking-tightener font-black capitalize">staff Information</h6>                                            
                                    );
                                })
                            }
                        </div>
                    </div>  {/* rounded-t bg-blueGray-100 mb-0 p-6 */}                   

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        {/* FORM FOR SHOWING USER DATA */}
                        <form id="showUserFormID">
                            <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-bold uppercase px-4">
                                {/* User Information */}
                            </h6>
                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="Lucky"
                                            value={user?.first_name}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        // defaultValue="Jesse"
                                        value={user?.last_name}
                                        disabled
                                    />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        // defaultValue="jesse@example.com"
                                        value={user?.email}
                                        disabled
                                    />
                                    </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="Phone Number"
                                            value={user?.phone}
                                            disabled
                                        />
                                    </div>
                                </div>
                        
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-gray-500 text-xl mt-10 mb-8 px-4 font-bold uppercase">
                                Contact Information
                            </h6>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            value={user?.address}
                                            disabled
                                        />
                                    </div>
                                    
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Address 2
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                            value={user?.address2}
                                            disabled
                                        />
                                    </div>
                                    
                                </div>

                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="city"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="New York"
                                            value={user?.city}
                                            disabled
                                        />
                                    </div>

                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="state"
                                        >
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                           
                                            value={user?.state}
                                            disabled
                                        />
                                    </div>

                                </div>
                                
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="United States"
                                            value={user?.country}
                                            disabled
                                        />
                                    </div>

                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-xl font-bold shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            // defaultValue="Postal Code"
                                            value={user?.postalCode}
                                            disabled
                                        />
                                    </div>
                                </div>                    
                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-gray-500 text-xl mt-10 mb-8 px-4 font-bold uppercase">
                                additional information
                            </h6>

                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="grid-password"
                                            >
                                            bio
                                        </label>
                                        <textarea
                                            type="text"
                                            className="border-0 py-6 px-6 mt-1.5 mb-6 placeholder-blueGray-300 text-black bg-slate-800 rounded text-xl font-bold shadow focus:outline-none w-full ease-linear transition-all duration-150 tracking-veryytight"
                                            // defaultValue="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                                            value={user?.aboutMe}
                                            disabled
                                            rows="6"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>          
                        </form>

                        <div className="rounded-t px-6 mt-4 mb-4">
                            <div className="text-center flex justify-between"> 
                                <button onClick={showUpdateForm}
                                    className="bg-lightBlue-500 text-white hover:bg-blue-600 active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button">Edit details
                                </button>

                                <button onClick={deleteUserData}
                                    className="bg-red-500 text-white hover:bg-red-600 active:bg-red-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button">Delete User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  



                <div className={`bg-white activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}>
                    <div className="bg-blue-900 mb-16 py-5.8 px-6 border-blue-900 border-0">
                        <div className="text-center flex justify-start items-center gap-6">                           
                            <Link to={redirToUserPage ? showUserInfo : showUserInfo}>
                                <button onClick={showUserInfo}
                                    className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-xl tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300"
                                    type="button">
                                    <span className="flex items-center gap-2">
                                        {String.fromCharCode(8592)}
                                        <p className="text-lg text-white">Back</p>
                                    </span> 
                                </button>   
                            </Link>
                            
                            <h6 className="text-white text-42xl tracking-tightener font-bold capitalize">update information</h6>    {/* text-blueGray-700 */}
                        </div>
                    </div>  {/* rounded-t bg-blueGray-100 mb-0 p-6 */}

                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        {/* FORM FOR UPDATING USER DATA */}
                        <form id="userUpdateFormID" onSubmit={handleSubmitUserInfo}>
                            <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-black uppercase px-4">
                                {/* Update Information */}
                            </h6>
                            <div className="flex flex-wrap">
                                                                               
                                {/* First Name */}
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="first_name">
                                            First Name
                                           
                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                                placeholder={user?.first_name}
                                                name="first_name"
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
                                            htmlFor="last_name">
                                            Last Name     

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                                placeholder={user?.last_name}
                                                name="last_name"
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
                                                type="text"
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150 hover:cursor-not-allowed"                                              
                                                placeholder={user?.email} 
                                                name="email"
                                                onChange={handleChangeUserInfo} 
                                                readOnly                                                                                           
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
                                            className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded-lg text-xl tracking-verytight shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150 h-168 indent-3 appearance-none"
                                            placeholder={user?.phone}
                                            name="phone"
                                            onChange={handleChangeUserInfo}                                            
                                        />
                                    </label>
                                </div>  

                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                                Contact Information
                            </h6>
                            <div className="flex flex-wrap">

                                {/* ADDRESS AND ADDRESS 2 */}
                                <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                    {/* Address */}
                                    <div className="relative w-3/6 mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="address">
                                            Address

                                            <input
                                                type="text"
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                placeholder={user?.address}
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
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                                placeholder={user?.address2}
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
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                            
                                                placeholder={user?.city}
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
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                                                placeholder={user?.state}
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
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                              
                                                placeholder={user?.country}
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
                                                className="border-0 px-3 py-3 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 rounded-xl text-xl shadow focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"
                                                placeholder={user?.postalCode}
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
                                
                                {/* OPTIONALS: */}
                                <div className="w-full lg:w-12/12 px-4">

                                    {/* BIO */}
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                            htmlFor="aboutMe">
                                            bio
                                    
                                            <textarea
                                                type="text"
                                                className="border-0 py-6 indent-4 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                placeholder={user?.aboutMe}
                                                name="aboutMe"
                                                onChange={handleChangeUserInfo}                                              
                                                rows="4">
                                            </textarea>
                                        </label>
                                    </div>

                                </div>

                                {/* SOCIALS: */}
                                <div className="w-full lg:w-12/12 px-4">                             
                                    {
                                        user?.socials?.map((item, index) => {
                                            return (
                                                <div key={index}>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="fb">
                                                            Facebook

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                                                                              
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.fb}
                                                                name="fb"
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="xr">
                                                            Twitter

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.xr}
                                                                name="xr"                                            
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="ig">
                                                            Instagram

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.ig}
                                                                name="ig"                                    
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="wh">
                                                            <span className="uppercase">Whatsapp</span> (E.g tel:+234 *** *** ****)

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.wh}
                                                                name="wh"                                    
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="pn">
                                                            Pinterest

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.pn}
                                                                name="pn"                                    
                                                            />
                                                        </label>
                                                    </div>

                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="tg">
                                                            Telegram

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.tg}
                                                                name="tg"                                    
                                                            />
                                                        </label>
                                                    </div>
                                                    
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="tk">
                                                            TikTok

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.tk}
                                                                name="tk"                                    
                                                            />
                                                        </label>
                                                    </div>
                                                   
                                                    <div className="relative w-full mb-3">
                                                        <label
                                                            className="block uppercase text-blueGray-600 text-lg tracking-tightener font-bold mb-2"
                                                            htmlFor="yt">
                                                            YouTube

                                                            <input
                                                                type="text"
                                                                className="border-0 py-6 mt-1.5 mb-6 placeholder-gray-500 text-blueGray-600 bg-gray-900 rounded text-xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring-1 w-full ease-linear transition-all duration-150"                                                
                                                                onChange={(e) => handleImageChange(index, e)}
                                                                placeholder={item?.yt}
                                                                name="yt"                                    
                                                            />
                                                        </label>
                                                    </div>

                                                </div>
                                            );
                                        })                            
                                    }
                                </div>
                            </div>

                            <div className="rounded-t px-6 mt-4 mb-4">
                                <div className="text-center flex justify-start">
                                    <button type="submit"
                                        onClick={handleSubmitUserInfo}
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    > Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>                   
                </div>
            </div>






            <div className="min-w-0 break-words lg:w-100 z-0 rounded-lg hidden lg:block">
                <div className="flex">
                    <div className="flex flex-col justify-center items-center shadow-lg bg-white border-0 pb-16 w-full gap-6">                        
                        {
                            displayImg ?
                                <img
                                className="rounded-full mt-12 mb-4"
                                src={`${displayImg}`}
                                alt="profile pic"
                                loading="lazy"
                                srcSet={`${displayImg} 800w, 
                                        ${displayImg} 1200w`}
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px" 
                                />                                         
                                :
                                <img
                                    className="rounded-full mt-12 mb-4"
                                    src={`${adminDashboardIcon}`}
                                    alt="profile pic"
                                    loading="lazy"
                                    srcSet={`${adminDashboardIcon} 800w, 
                                            ${adminDashboardIcon} 1200w`}
                                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 800px" 
                                />
                        }

                        <div id="user-socials" className="flex flex-wrap gap-8 w-4/5">
                            {                       
                                user?.socials?.map((item, index) => {
                                    return (
                                        <div key={index} className="flex w-full items-center justify-center gap-6">
                                            
                                            <Link target="_blank" to={`${item?.fb}`} className="w-10 h-10">
                                                <FacebookIcon />
                                            </Link>
                                            <Link target="_blank" to={`${item?.xr}`} className="w-10 h-10 mt-1.5">
                                                <TwitterIcon />
                                            </Link>
                                            <Link target="_blank" to={`${item?.ig}`} className="w-10 h-10 mt-1.5">
                                                <InstagramIcon />
                                            </Link>                              
                                            <Link target="_blank" to={`${item?.wh}`} className="w-10 h-10">
                                                <WhatsappIcon />
                                            </Link>
                                            <Link target="_blank" to={`${item?.yt}`} className="w-10 h-10">
                                                <YoutubeIcon />
                                            </Link>
                                            
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
