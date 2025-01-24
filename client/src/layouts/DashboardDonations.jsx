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
    // CardAllPublishedPosts, CardAllDraftPosts,
    TableDropdown,    
} from "../components";

// views
// import { DonationsTable } from "../views";





const addCommasToThisNumber = (num) => {
    // return data.toLocaleString('en-US', { style: 'currency', currency: 'NGN', minimumFractionDigits: 3});
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
};






const DashboardDonations = ({ color, isLoggedIn }) => {


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
        const pageTitle = "Dashboard - Manage Donations",
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
        logEvent(`${firstName} ${lastName} [${userEmail}] visited ${pageTitle}`);
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
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut(); 
    // console.log("Logged-In User E-mail: ", userEmail);
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // console.log("Logged-In User E-mail: ", userRoles);    
    const displayImg = isLoggedIn?.display_img ? isLoggedIn?.display_img : '';
    // console.log("Logged-In User DP: ", displayImg);    
    // const userBio = isLoggedIn?.aboutMe ? isLoggedIn?.aboutMe : '';
    // console.log("Logged-In User BIO: ", userBio);    
    // ***************************************************************************
    // ***************************************************************************




    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL DONATIONS
    // ****************************************************************************
    const [allDonations, setAllDonations] = useState([]);
    // console.log("ALL DONATIONS: ", allDonations);
    const [totalDonations, setTotalDonations] = useState(null);
    // console.log("TOTAL DONATIONS: ", totalDonations);
        const [totalActiveDonations, setTotalActiveDonations] = useState(null);
        // console.log("TOTAL ACTIVE DONATIONS: ", totalPublishedDonations);
        const [totalInactiveDonations, setTotalInactiveDonations] = useState(null);
        // console.log("TOTAL INACTIVE DONATIONS: ", totalDraftDonations);
        // const [totalScheduledDonations, setTotalScheduledDonations] = useState(null);
        // console.log("TOTAL SCHEDULED DONATIONS: ", totalScheduledDonations);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
   
    const leftArrow = "<", 
          rightArrow = ">",
          nairaSymbol = '₦';

    // Number of items per page
    const [pageLimit, setPageLimit] = useState(undefined);
    // console.log("PAGE LIMIT: ", pageLimit);
    

    


    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("donationsList");
    // ****************************************************************************
    // MAKE activeDisplay navLink ACTIVE
    // ****************************************************************************
    useEffect(() => {
        var allPostsLink = document.querySelector("#donationsLinkID .donationsList");        
        if (activeDisplay === "donationsList") {
            setCurrentPage(1);
            allPostsLink?.classList?.add("activeDonationView");          
        } else {
            allPostsLink?.classList.remove("activeDonationView");     
        };
    }, [activeDisplay]);
    // ****************************************************************************
    // ****************************************************************************  




    // ****************************************************************************            
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL DONATIONS
    // ****************************************************************************             
    useEffect(() => {                                 
        if (activeDisplay === "donationsList") {
                        
            setIsLoading(true);           

            var timer = setTimeout(fetchAllDonations, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };            
        };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    
    async function fetchAllDonations() {     
        var limit = 10;   // Number of items per page

        await api.get(`/api/v3/admin/donations/manage?page=${currentPage}&limit=${limit}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { donations, pagination } = data;

            if (!success && message === "No donation found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
            };

            setAllDonations(donations);
            setPageLimit(pagination?.donationsLimit);

            setTotalDonations(pagination?.donationsRecord);
            setTotalPages(pagination?.lastPage);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });


        await api.get(`/api/v3/admin/donations/manage/activeDonations`)
        .then((response) => {
            const { success, data, message } = response.data;
            if (!success && message === "No donation found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalActiveDonations(data);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v3/admin/donations/manage/inactiveDonations`)
        .then((response) => {
            const { success, data, message } = response.data;              
            if (!success && message === "No donation found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalInactiveDonations(data);
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
    const search_parameters = Object.keys(Object.assign({}, ...allDonations));

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
                
                    <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">                            
                            {/* Brand */}
                            <Link
                                className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                to="/admin/dashboard"
                                onClick={(e) => e.preventDefault()}
                            >
                                Dashboard
                            </Link>


                            {/* Form*/}
                            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 lg:mr-28 w-98 h-178">
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
                                        placeholder="Search user"
                                    />

                                    <button type="submit" onSubmit={fetchAllDonations}></button>
                                </div>                                             
                            </form>
                

                            {/* User */}
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <UserDropdown userId={userId} userEmail={userEmail} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                            </ul>
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
                                    <div id="donationsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                        <Link className="donationsList activeDonationView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("donationsList")}>All <span className="off_white"> ({ totalDonations })</span></Link>
                                        <Link className="publishedDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("activeDonations")}>Active  <span className="off_white"> ({ totalActiveDonations })</span></Link>
                                        <Link className="draftDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("inactiveDonations")}>Inactive  <span className="off_white"> ({ totalInactiveDonations })</span></Link>
                                        {/* <Link className="scheduledDonations pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledDonations")}>Scheduled  <span className="off_white"> ({ totalScheduledDonations })</span></Link> */}
                                    </div> 
                                    {/* Donations Navigation */}


                                    
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
                                                    All Donations
                                                </h3>

                                                <Link className="relative -top-2" to={'/admin/donations/manage/create'} alt='create donation'>
                                                    <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Page Title */}

        
        
                                    <div className={`w-full overflow-x-auto ${activeDisplay === "donationsList" ? "block" : "hidden"}`}>
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
                                                            Featured Image
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Donation Title
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Amount Raised
                                                        </th>
                                                        <th
                                                            className={
                                                                "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                                (color === "light"
                                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                                : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                            }
                                                        >
                                                            Target Amount
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

                                <button type="submit" onSubmit={fetchAllDonations}></button>
                            </div>                                             
                        </form>
                        {/* Form */}


                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <UserDropdown userId={userId} userEmail={userEmail} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
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
                                <div id="donationsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                    <Link className="donationsList activeDonationView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("donationsList")}>All <span className="off_white"> ({ totalDonations })</span></Link>
                                    <Link className="publishedDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("activeDonations")}>Active  <span className="off_white"> ({ totalActiveDonations })</span></Link>
                                    <Link className="draftDonations pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("inactiveDonations")}>Inactive  <span className="off_white"> ({ totalInactiveDonations })</span></Link>
                                    {/* <Link className="scheduledDonations pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledDonations")}>Scheduled  <span className="off_white"> ({ totalScheduledDonations })</span></Link> */}
                                </div> 
                                {/* Donations Navigation */}


                                
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
                                                All Donations
                                            </h3>

                                            <Link className="relative -top-2" to={'/admin/donations/manage/create'} alt='create new donation'>
                                                <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}



                                {/* Views */}
                                <div className={`w-full overflow-x-auto ${activeDisplay === "donationsList" ? "block" : "hidden"}`}>
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
                                                        Featured Image
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Donation Title
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Amount Raised
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Target Amount
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
                                        {search(allDonations)?.length !== 0 ?
                                                <tbody>                                                    
                                                    {search(allDonations)?.map((post, userIndex) => {
                                                            if (post?.status === "inactive") {
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
                                                                                {post?.title?.substring(0,44)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountRaised)} 
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountToRaise)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-orange-500 mr-2"></i>{post?.status === 'draft' ? 'inactive' : post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/manage/${post?._id}`}>View details</Link>
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown />
                                                                        </td>
                                                                    </tr>               
                                                                );
                                                            } else if (post?.status === "scheduled") {
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
                                                                                {post?.title?.substring(0,44)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountToRaise)}                      
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountRaised)}                        
                                                                        </td>

                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-yellow-500 mr-2"></i>{post?.status === 'scheduled' ? 'active' : post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/manage/${post?._id}`}>View details</Link>
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
                                                                                {post?.title?.substring(0,44)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountToRaise)}                        
                                                                        </td> 
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-14xl font-serif tracking-supertight font-bold whitespace-nowrap text-red-500">
                                                                            {nairaSymbol}{addCommasToThisNumber(post?.amountRaised)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-green-500 mr-2"></i>{post?.status === 'published' ? 'active' : post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/donations/manage/${post?._id}`}>View details</Link>
                                                                        </td>                  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                                            <TableDropdown post={post} />
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

export default DashboardDonations;



DashboardDonations.defaultProps = {
    color: "dark",
};
  
DashboardDonations.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
