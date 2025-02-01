import { useState, useEffect, } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import api from "../api";
import setNigerianTime from "../middlewares/setNigerianTime";
import { spinner } from "../assets/images";
import "../assets/styles/tailwind.css";

// components
import { 
    Sidebar,
    UserDropdown,
    // CardAllSuccessfulDonations, CardAllPendingDonations, CardAllFailedDonations,
    TableDropdown,    
} from "../components";

// views
// import { DonationsHistoryTable } from "../views";





const convertDate = (dateString) => {
    
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',        
        hour12: true
    };
    return date.toLocaleString('en-GB', options);
};




const DashboardDonationsHistory = ({ color, isLoggedIn }) => {

       
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
        window.scrollBy({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Dashboard - Donations History", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
        logEvent(`${firstName} ${lastName} [${userName}] visited ${pageTitle}`);
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



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
    const firstName = isLoggedIn?.first_name ? isLoggedIn?.first_name : logOut();
    // console.log("Logged-In User First Name: ", firstName);
    const lastName = isLoggedIn?.last_name ? isLoggedIn?.last_name : logOut();            
    // console.log("Logged-In User Last Name: ", lastName);
    const userName = isLoggedIn?.user_name ? isLoggedIn?.user_name : logOut(); 
    // console.log("Logged-In Username: ", userName);
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // console.log("Logged-In User E-mail: ", userRoles);    
    const displayImg = isLoggedIn?.display_img ? isLoggedIn?.display_img : '';
    // console.log("Logged-In User DP: ", displayImg);    
    const expiresAt = isLoggedIn?.expires_at ? isLoggedIn?.expires_at : logOut();
    // console.log("Logged-In User Session Exp: ", expiresAt);
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
    // MANAGE STATE:-  TO FIND HISTORY OF ALL DONATION ATTEMPTS
    // ****************************************************************************
    const [allDonationsHistory, setAllDonationsHistory] = useState([]);
    // console.log("ALL DONATIONS: ", allDonationsHistory);
    
    const [totalDonationsInHistory, setTotalDonationsInHistory] = useState(null);
    // console.log("TOTAL DONATIONS: ", totalDonations);

        const [totalSuccessfulDonations, setTotalSuccessfulDonations] = useState(null);
        // console.log("TOTAL SUCCESSFUL DONATIONS: ", totalPublishedDonations);
        
        const [totalPendingDonations, setTotalPendingDonations] = useState(null);
        // console.log("TOTAL PENDING DONATIONS: ", totalPendingDonations);

        const [totalFailedDonations, setTotalFailedDonations] = useState(null);
        // console.log("TOTAL FAILED DONATIONS: ", totalFailedDonations);
      
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
   
    const leftArrow = "<", 
          rightArrow = ">";

    // Number of items per page
    const [pageLimit, setPageLimit] = useState(undefined);
    // console.log("PAGE LIMIT: ", pageLimit);
    




    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("donationsHistoryList");

    useEffect(() => {
        var allDonationsHistoryLink = document.querySelector("#donationsHistoryLinkID .donationsHistoryList");        
        if (activeDisplay === "donationsHistoryList") {
            setCurrentPage(1);
            allDonationsHistoryLink?.classList?.add("activeDonationHistoryView");          
        } else {
            allDonationsHistoryLink?.classList.remove("activeDonationHistoryView");     
        };
    }, [activeDisplay]);
    // ****************************************************************************
    // ****************************************************************************  




    // ****************************************************************************            
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FETCH HISTORY OF ALL DONATIONS
    // ****************************************************************************             
    useEffect(() => {                                 
        if (activeDisplay === "donationsHistoryList") {
                        
            setIsLoading(true);           

            var timer = setTimeout(fetchAllDonationsHistory, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };

        };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    
    async function fetchAllDonationsHistory() {     
        var pageLimit = 10;   // Number of items per page

        await api.get(`/api/v3/admin/donations/history/manage?page=${currentPage}&limit=${pageLimit}`)
        .then((response) => {
                    const { success, data, message } = response.data;
                    const { donationsHistory, pagination } = data;

                    if (!success && message === "No donation history found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllDonationsHistory(donationsHistory);
                    setPageLimit(pagination?.donationsHistoryLimit);

                    setTotalDonationsInHistory(pagination?.donationsHistoryRecord);
                    setTotalPages(pagination?.lastPage);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });


        await api.get(`/api/v3/admin/donations/history/manage/successful`)
        .then((response) => {
            const { success, data, message } = response.data;
            if (!success && message === "No donation history found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalSuccessfulDonations(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v3/admin/donations/history/manage/pending`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No donation found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalPendingDonations(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v3/admin/donations/history/manage/failed`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No donation history found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalFailedDonations(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************

    


    // ****************************************************************************            
    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...allDonationsHistory));

    function search(data) {
        return data?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
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
                       
                    {/* Admin Navbar */}
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
                                        name="q"
                                        id="search-form"
                                        className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search here "
                                    />

                                    <button type="submit" onSubmit={fetchAllDonationsHistory}></button>
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
                    {/* Admin Navbar */}


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


                    {/* Donations Table */}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                        <div className="flex flex-wrap mt-4">
                            <div className="w-full mb-12 px-4">         
                                <div
                                    className={
                                        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                        (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                    }>



                                    {/* Donations Navigation */}
                                    <div id="donationsHistoryLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                        <Link className="donationsHistoryList activeDonationHistoryView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("donationsHistoryList")}>All <span className="off_white"> ({ totalDonationsInHistory })</span></Link>
                                        <Link className="successfulDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("successfulDonations")}>Successful  <span className="off_white"> ({ totalSuccessfulDonations })</span></Link>
                                        <Link className="pendingDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("pendingDonations")}>Pending  <span className="off_white"> ({ totalPendingDonations })</span></Link>
                                        <Link className="failedDonations pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("failedDonations")}>Failed  <span className="off_white"> ({ totalFailedDonations })</span></Link>
                                    </div> 
                                    {/* Donations Navigation */}


                                    
                                    {/* Page Title */}
                                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                                        <div className="flex flex-wrap items-center">
                                            <div className="relative w-full px-4 max-w-full flex justify-start items-center flex-grow flex-1">
                                                <h3
                                                    className={
                                                        "font-semibold text-lg " +
                                                        (color === "dark" ? "text-blueGray-700" : "text-white")
                                                    }
                                                >
                                                    Donations History
                                                </h3>

                                                {/* <Link className="relative -top-2" to={'/admin/donations/manage/create'} alt='create new donation'>
                                                    <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                                </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* Page Title */}


        
                                    <div className={`w-full overflow-x-auto ${activeDisplay === "donationsHistoryList" ? "block" : "hidden"}`}>
                                        
                                        {/* Donations table */}
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
                                                        Campaign
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Donor Name
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Amount Paid 
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

                {/* Admin Navbar */}
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
                                    name="q"
                                    id="search-form"
                                    className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search here "
                                />

                                <button type="submit" onSubmit={fetchAllDonationsHistory}></button>
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
                {/* Admin Navbar */}


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

                
                {/* Donations Table */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full mb-12 px-4">         
                            <div
                                className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                }>



                                {/* Donations Navigation */}
                                <div id="donationsHistoryLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                    <Link className="donationsHistoryList activeDonationHistoryView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("donationsHistoryList")}>All <span className="off_white"> ({ totalDonationsInHistory })</span></Link>
                                    <Link className="successfulDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("successfulDonations")}>Successful  <span className="off_white"> ({ totalSuccessfulDonations })</span></Link>
                                    <Link className="pendingDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("pendingDonations")}>Pending  <span className="off_white"> ({ totalPendingDonations })</span></Link>
                                    <Link className="failedDonations pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("failedDonations")}>Failed  <span className="off_white"> ({ totalFailedDonations })</span></Link>
                                </div> 
                                {/* Donations Navigation */}


                                
                                {/* Page Title */}
                                <div className="rounded-t mb-0 px-4 py-3 border-0">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full px-4 max-w-full flex justify-start items-center flex-grow flex-1">
                                            <h3
                                                className={
                                                    "font-semibold text-lg " +
                                                    (color === "dark" ? "text-blueGray-700" : "text-white")
                                                }
                                            >
                                                Donations History
                                            </h3>

                                            {/* <Link className="relative -top-2" to={'/admin/donations/manage/create'} alt='create new donation'>
                                                <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}



                                {/* Views */}
                                <div className={`w-full overflow-x-auto ${activeDisplay === "donationsHistoryList" ? "block" : "hidden"}`}>
                                    
                                    {/* Projects table */}

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
                                                        Campaign
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Donor Name
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Amount Paid 
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
                                        {search(allDonationsHistory)?.length !== 0 ?
                                                <tbody>                                                    
                                                    {search(allDonationsHistory)?.map((post, userIndex) => {
                                                            if (post?.status === "pending") {
                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                    <tr key={userIndex}>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                            #{userIndex+1}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                            {   
                                                                                post?.images?.map((item, itemIndex) => {
                                                                                    if (item?.featured === true) {
                                                                                        return (
                                                                                            <div key={itemIndex} className="">
                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                })
                                                                            }    
                                                             
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                            <span
                                                                                className={
                                                                                    "ml-3 font-bold " +
                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                }>
                                                                                {post?.firstname} {post?.lastname}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-orange-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/history/manage/${post?._id}`}>View details</Link>
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            } else if (post?.status === "failed") {
                                                                return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                    <tr key={userIndex}>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                                            #{userIndex+1}
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                            {   
                                                                                post?.images?.map((item, itemIndex) => {
                                                                                    if (item?.featured === true) {
                                                                                        return (
                                                                                            <div key={itemIndex} className="">
                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                })
                                                                            }    
                                                             
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                            <span
                                                                                className={
                                                                                    "ml-3 font-bold " +
                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                }>
                                                                                {post?.firstname} {post?.lastname}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-yellow-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/history/manage/${post?._id}`}>View details</Link>
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
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap flex justify-center items-center">                                                                         
                                                                            {   
                                                                                post?.images?.map((item, itemIndex) => {
                                                                                    if (item?.featured === true) {
                                                                                        return (
                                                                                            <div key={itemIndex} className="">
                                                                                                <img src={item?.url} className="h-20 max-w-24 bg-white rounded-lg border" alt={item?.alt} />{" "}
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                })
                                                                            }    
                                                             
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">   
                                                                            <span
                                                                                className={
                                                                                    "ml-3 font-bold " +
                                                                                    + (color === "light" ? "text-blueGray-600" : "text-white")
                                                                                }>                                                                               
                                                                                {post?.firstname} {post?.lastname}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-green-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/manage/${post?._id}`}>View details</Link>
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            };
                                                    })}
                                                </tbody>
                                                :
                                                <tbody>                    
                                                    <tr>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                        <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No donation found</td>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                        <td className=""></td>
                                                    </tr>
                                                </tbody>
                                        }
                                    </table>


                                    {/* Pagination controls */}
                                    <div className="flex justify-between items-center py-2 mr-6">
                                        <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                            {pageLimit} 
                                        <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
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
                                {/* <Suspense fallback={<div>Loading...</div>}>                
                                    <CardAllPublishedPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                </Suspense>       
                                <Suspense fallback={<div>Loading...</div>}>                            
                                    <CardAllDraftPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                </Suspense>      */}
                                {/* <Suspense fallback={<div>Loading...</div>}>
                                    <CardAllScheduledPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                </Suspense> */}
                                {/* Views */}

                            </div>
                        </div>
                    </div>                  
                </div>
                {/* Donations Table */}

            </div>            
            {/***** RIGHT-PANEL *****/}            
        </>
    );
};

export default DashboardDonationsHistory;


DashboardDonationsHistory.defaultProps = {
    color: "dark",
};
  
DashboardDonationsHistory.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
