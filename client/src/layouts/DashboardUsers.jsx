import { Suspense, useState, useEffect, } from "react";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate, } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import setNigerianTime from "../middlewares/setNigerianTime";
import { spinner } from "../assets/images";
import sketch from "../assets/img/sketch.jpg";
import "../assets/styles/tailwind.css";
// components
import { 
    Sidebar,          
    UserDropdown,
    CardAllApprovedUsers, CardAllPendingUsers, CardAllRejectedUsers,
    TableDropdown,
} from "../components";

// views
// import {  
//    UsersTable,
// } from "../views";








const DashboardUsers = ({ color, isLoggedIn }) => {

    
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

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, });
        const pageTitle = "Dashboard - Manage Users", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
        logEvent(`${firstName} ${lastName} [${userName}] visited ${pageTitle}`);
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //

    

    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("allUsers");
    const leftArrow = "<", 
          rightArrow = ">";



    const navigate = useNavigate();
    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Set Log Out status in Local Storage
        const sessionend = "You are Logged out";
        localStorage?.setItem('logout', sessionend);
        // End of User Session:- Clear User Details from Local Storage
        localStorage?.removeItem("user");
        // log out function to log the user out of google and set the profile array to null    
        googleLogout();
        // redirect to Login Page    
        const redirToLogin = "/user/login";
        navigate(redirToLogin);
        // window.location.replace(redirToLogin);
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const userId = isLoggedIn?.id ? isLoggedIn?.id : logOut();
    // console.log("Logged-In User ID: ", userId);
    const userName = isLoggedIn?.user_name ? isLoggedIn?.user_name : logOut(); 
    // console.log("Logged-In User Name: ", userName);
    const firstName = isLoggedIn?.first_name ? isLoggedIn?.first_name : logOut();
    // console.log("Logged-In User First Name: ", firstName);
    const lastName = isLoggedIn?.last_name ? isLoggedIn?.last_name : logOut();            
    // console.log("Logged-In User Last Name: ", lastName);
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // console.log("Logged-In User E-mail: ", userRoles);    
    const displayImg = isLoggedIn?.display_img ? isLoggedIn?.display_img : '';   // console.log("Logged-In User DP: ", displayImg);    
    // console.log("Logged-In User DP: ", displayImg);    
    const expiresAt = isLoggedIn?.expires_at ? isLoggedIn?.expires_at : logOut();
    console.log("Logged-In User Session Exp: ", expiresAt);
    // const userBio = isLoggedIn?.aboutMe ? isLoggedIn?.aboutMe : '';
    // console.log("Logged-In User BIO: ", userBio);    
    // ***************************************************************************
    // ***************************************************************************


    
    
    useEffect(() => {
        if (expiresAt <= 0) {
            localStorage?.removeItem("user");
            const redirToLogin = "/user/login";
            navigate(redirToLogin);
        };
    }, [expiresAt]);

    


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [allUserss, setAllUserss] = useState([]);
    // console.log("ALL USERS: ", allUserss);
    
        const [totalApprovedUsers, setTotalApprovedUsers] = useState();
        // console.log("TOTAL APPROVED USERS: ", totalApprovedStaffs);
        const [totalPendingUsers, setTotalPendingUsers] = useState();
        // console.log("TOTAL PENDING USERS: ", totalPendingStaffs);
        const [totalRejectedUsers, setTotalRejectedUsers] = useState();
        // console.log("TOTAL REJECTED USERS: ", totalRejectedStaffs);
    
            const [totalUsers, setTotalUsers] = useState(null);
            // console.log("TOTAL USERS: ", totalUsers);   

    const [totalPages, setTotalPages] = useState(0);
    const [pageLimit, setPageLimit] = useState(undefined); // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);  



    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...allUserss));   

    useEffect(() => {

        // Assuming the token is passed as a query parameter
        const { search } = window.location;
        // console.log("CURRENT LOCATION OF URL.Search: ", search);

        const queryParams = new URLSearchParams(search);
        const searchedTerm = queryParams.get('search');
        // console.log("Searched TERM: ", searchedTerm);
 
        if (searchedTerm !== null) {           
            setQuery(searchedTerm);
        };

    }, [window.location]);

    function search(allUserss) {
        return allUserss?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };
    // ****************************************************************************
    // ****************************************************************************


        
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL USERS
    // ****************************************************************************             
    useEffect(() => {
        var allUsersLink = document.querySelector("#usersLinkID .allUsers");                       
        if (activeDisplay === "allUsers") {
            setCurrentPage(1);
            allUsersLink?.classList.add("activeUserView");
        } else {
            allUsersLink?.classList.remove("activeUserView");
        };
    }, [activeDisplay]);

    async function fetchAllUsers() {
        await api.get(`/api/v1/auth/account/by-role/ROLE_USERS?page=${currentPage}&limit=${pageLimit}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { allUsers, pagination } = data;

            if (!success && message === "No user found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setAllUserss(allUsers);
            setPageLimit(pagination?.recordLimit);

            setTotalUsers(pagination?.usersRecord);
            setTotalPages(pagination?.lastPage);
        
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
        

        await api.get(`/api/v1/account/users/manage/approved`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No user found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setTotalApprovedUsers(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v1/account/users/manage/pending`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No user found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setTotalPendingUsers(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v1/account/users/manage/rejected`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No user found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setTotalRejectedUsers(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
    };

    useEffect(() => {
        if (activeDisplay === "allUsers") {
          
            setIsLoading(true);
     
            var timer = setTimeout(fetchAllUsers, 500);   // Delay execution of findAllUsers by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes         
            };
        };       
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************







    if (isLoading) {
        return (
            <>
                {/***** LEFT-PANEL *****/}
                <Sidebar />
                {/***** LEFT-PANEL *****/}
                

                

                {/***** RIGHT-PANEL *****/}
                <div className="relative md:ml-64 bg-blueGray-100">
                
                    <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                                               
                            {/* Brand */}
                            <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                to={"/admin/dashboard"} onClick={(e) => e.preventDefault()}>Dashboard 
                            </Link>
                            {/* Brand */}


                            {/* Form*/}
                            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
                                <div className="relative flex w-full flex-wrap items-stretch">                      
                                    <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                        <i className="fas fa-search"></i>
                                    </span>
                                        
                                    <input
                                        type="search"
                                            name="search"
                                            id="search-form"
                                            className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search user"
                                    />

                                    <button type="submit" onSubmit={fetchAllUsers}></button>
                                </div>                                             
                            </form>
                            {/* Form */}


                            {/* User */}
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <UserDropdown userId={userId} userName={userName} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                            </ul>
                            {/* User */}

                        </div>
                    </nav>


                    {/* Header */}
                    <div className="relative bg-blue-900 md:pt-32 pb-32 pt-12">
                
                        {/* Welcome Logged-In User */}
                        <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                            <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                                Welcome <span className="font-bold text-white">{lastName}</span>
                            </p>
                        </div>                
                        {/* <HeaderStats /> */}

                    </div>


                    {/* Users Table */}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">   
            
                        <div className="flex flex-wrap mt-4">
                            <div className="w-full mb-12 px-4">
                                <div
                                    className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                    }
                                >
        
                                    {/* Users Navigation */}
                                    <div id="usersLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                        <Link className="allUsers activeUserView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allUsers")}>All <span className="off_white"> ({ totalUsers })</span> </Link>
                                        <Link className="allApprovedUsers pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allApprovedUsers")}>Approved  <span className="off_white"> ({ totalApprovedUsers })</span></Link>
                                        <Link className="allPendingUsers pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allPendingUsers")}>Pending  <span className="off_white"> ({ totalPendingUsers })</span></Link>
                                        <Link className="allRejectedUsers pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allRejectedUsers")}>Rejected  <span className="off_white"> ({ totalRejectedUsers })</span></Link>
                                    </div>
                                    {/* Users Navigation */}
        
                                    
                                    {/* Page Title */}
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                                <h3
                                                    className={
                                                    "font-semibold text-lg " +
                                                    (color === "dark" ? "text-blueGray-700" : "text-white")
                                                    }
                                                >
                                                    All Users
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Page Title */}
        
        
                                    <div className={`w-full overflow-x-auto ${activeDisplay === "allUsers" ? "block" : "hidden"}`}>
                                        {/* Staffs table */}
                                        <table className="items-center w-full bg-transparent border-collapse">
                                            <thead>
                                                <tr>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    >
                                                    S/N
                                                    </th>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    >
                                                    Full Name
                                                    </th>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    >
                                                    E-mail address
                                                    </th>
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    >
                                                    Status
                                                    </th> 
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    >
                                                    Action
                                                    </th>              
                                                    <th
                                                    className={
                                                        "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                        (color === "light"
                                                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                        : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                    }
                                                    ></th>
                                                </tr>
                                            </thead>
                                            <tbody className='w-16 h-16'>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td className="max-w-40 h-60 flex flex-col justify-center items-center">                                                                                             
                                                        <img src={spinner} alt="Spinning" className="ml-80 mx-auto" />                                                              
                                                        <p className="text-xl tracking-extratight font-semibold">Loading...</p>                                  
                                                    </td>
                                                    <td></td>
                                                </tr>                
                                            </tbody>
                                        </table>
                                    </div> 
                                </div>    
                            </div>
                        </div>

                    </div>
                </div>            
            {/***** RIGHT-PANEL *****/}     
            </>
        );
    };




    return (
        <>
            {/***** LEFT-PANEL *****/}
            <Sidebar />
            {/***** LEFT-PANEL *****/}
            

            

            {/***** RIGHT-PANEL *****/}
            <div className="relative md:ml-64 bg-blueGray-100">

                {/* Navbar */}
                <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                    <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">                            
                        
                        {/* Brand */}
                        <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                            to={"/admin/dashboard"} onClick={(e) => e.preventDefault()}>Dashboard 
                        </Link>
                        {/* Brand */}


                        {/* Form */}
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28  w-98 h-178">
                            <div className="relative flex w-full flex-wrap items-stretch">                      
                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                    <i className="fas fa-search"></i>
                                </span>
                                    
                                <input
                                    type="search"
                                    name="search"
                                    id="search-form"
                                    className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search user"
                                />

                                <button type="submit" onSubmit={fetchAllUsers}></button>
                            </div>                                             
                        </form>
                        {/* Form */}


                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <UserDropdown userId={userId} userName={userName} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                        </ul>
                        {/* User */}

                    </div>
                </nav>
                {/* Navbar */}

  
                
                {/* Header */}
                <div className="relative bg-blue-900 md:pt-32 pb-32 pt-12">
              
                    {/* Welcome Logged-In User */}
                    <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                        <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                            Welcome <span className="font-bold text-white">{lastName}</span>
                        </p>
                    </div>                
                    {/* <HeaderStats /> */}

                </div>
                {/* Header */}



                {/* Users Table */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full mb-12 px-4">         
                            <div
                                className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                }>



                                {/* Staffs Navigation */}
                                <div id="usersLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                    <Link className="allUsers activeUserView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allUsers")}>All <span className="off_white"> ({ totalUsers })</span></Link>
                                    <Link className="allApprovedUsers pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allApprovedUsers")}>Approved  <span className="off_white"> ({ totalApprovedUsers })</span></Link>
                                    <Link className="allPendingUsers pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allPendingUsers")}>Pending  <span className="off_white"> ({ totalPendingUsers })</span></Link>
                                    <Link className="allRejectedUsers pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("allRejectedUsers")}>Rejected  <span className="off_white"> ({ totalRejectedUsers })</span></Link>
                                </div>
                                {/* Users Navigation */}


                                
                                {/* Page Title */}
                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full px-4 max-w-full flex justify-between items-center flex-grow flex-1">
                                            <h3
                                                className={
                                                    "font-semibold text-lg " +
                                                    (color === "dark" ? "text-blueGray-700" : "text-white")
                                                }
                                            >
                                                All Users
                                            </h3>                    
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}

 

                                {/* Views */}
                                <div className={`w-full overflow-x-auto ${activeDisplay === "allUsers" ? "block" : "hidden"}`}>
                                    
                                    {/* Projects table */}
                                    <table className="items-center w-full bg-transparent border-collapse">
                                        <thead>
                                            <tr>
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}>
                                                    S/N
                                                </th>
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}>
                                                    Full Name
                                                </th>
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}>
                                                    E-mail address
                                                </th>
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}>
                                                    Status
                                                </th> 
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}>
                                                    Action
                                                </th>              
                                                <th className={"px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + (color === "light" ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100" : "bg-blueGray-50 text-gray-500 border-lightBlue-300")}></th>
                                            </tr>
                                        </thead>
                                        {search(allUserss)?.length !== 0 ?
                                                <tbody>                                                    
                                                    {search(allUserss)?.map((user, userIndex) => {
                                                            if (user?.status === "pending") {
                                                                return (
                                                                    <tr key={userIndex}>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                            #{userIndex+1}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap text-left flex items-center capitalize">
                                                                            <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                                                            <span className={"ml-3 font-bold " +  +(color === "light" ? "text-blueGray-600" : "text-white")}>
                                                                                {user?.firstName} {user?.lastName}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {user?.email}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-orange-400 mr-2"></i>{user?.status}
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/users/${user?._id}`}>View details</Link>
                                                                        </td>    
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            } else if (user?.status === "rejected") {
                                                                return (
                                                                    <tr key={userIndex}>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                            #{userIndex+1}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap text-left flex items-center">
                                                                            <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                                                            <span
                                                                                className={
                                                                                    "ml-3 font-bold " +
                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                }>
                                                                                {user?.firstName} {user?.lastName}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {user?.email}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-red-500 mr-2"></i>{user?.status}
                                                                        </td> 
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/users/${user?._id}`}>View details</Link>
                                                                        </td>                   
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            } else {
                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                    <tr key={userIndex}>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                            #{userIndex+1}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap text-left flex items-center">
                                                                            <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                                                            <span
                                                                                className={
                                                                                "ml-3 font-bold " +
                                                                                +(color === "light" ? "text-blueGray-600" : "text-white")
                                                                                }>
                                                                                {user?.firstName} {user?.lastName}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {user?.email}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-green-500 mr-2"></i>{user?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/users/${user?._id}`}>View details</Link>
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            };
                                                        })
                                                    }
                                                </tbody>
                                                :
                                                <tbody>                    
                                                    <tr>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                        <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No record of user</td>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                    </tr>
                                                </tbody>
                                        }
                                    </table>
                                    {/* Projects table */}


                                    {/* Pagination controls */}
                                    <div className="flex justify-between items-center py-2 mr-6">
                                        <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                            {pageLimit} <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                                        </div>
                                        
                                        <nav className="relative z-0 inline-flex shadow-sm">
                                            
                                            {/* Previous page button */}
                                            <button
                                                                    onClick={() => handlePageChange(currentPage - 1)}
                                                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                    disabled={currentPage === 1}
                                                                >{leftArrow}
                                            </button>


                                            {/* Page numbers */}
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                                        <button
                                                                        key={index}
                                                                        onClick={() => handlePageChange(index + 1)}
                                                                        className={`-ml-px relative inline-flex items-center border border-gray-300 text-xl font-black outline-none focus:outline-none hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === index + 1 ? 'bg-gray-100 text-blue-800' : ''}`}>
                                                                        {index + 1}
                                                                        </button>
                                            ))}


                                            {/* Next page button */}
                                            <button
                                                                    onClick={() => handlePageChange(currentPage + 1)}
                                                                    className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                    disabled={currentPage === totalPages}
                                                                >{rightArrow}
                                            </button>
                                            
                                        </nav>
                                    </div>
                                    {/* Pagination controls */}

                                </div>
                                <Suspense fallback={<div>Loading...</div>}>                
                                    <CardAllApprovedUsers color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                </Suspense>       
                                <Suspense fallback={<div>Loading...</div>}>                            
                                    <CardAllPendingUsers color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                </Suspense>     
                                <Suspense fallback={<div>Loading...</div>}>
                                    <CardAllRejectedUsers color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                </Suspense>
                                {/* Views */}

                            </div>
                        </div>
                    </div>                  
                </div>
                {/* Users Table */}

            </div>               
            {/***** RIGHT-PANEL *****/}
        </>
    );
};


export default DashboardUsers;


DashboardUsers.defaultProps = {
    color: "dark",
};
  
DashboardUsers.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};