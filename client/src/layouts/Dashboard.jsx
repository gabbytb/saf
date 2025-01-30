import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import "../assets/styles/tailwind.css";
import setNigerianTime from "../middlewares/setNigerianTime";
// components
import { 
    Sidebar, 
    UserDropdown,
    HeaderStats, 
} from "../components";
// views
import {
    DashboardTable, 
} from "../views";


// ********************************** //
// ***         LOG: EVENT         *** // 
// ********************************** //
const logEvent = (message, mode = 'TRACKER') => {
    // Send the log to a backend server
    const payload = {
        message,
        mode: mode.toLowerCase(),
        timestamp: setNigerianTime(),
    };
    api.post('/api/logs', payload);
};
// ********************************* //
// ********************************* //





const Dashboard = ({ isLoggedIn }) => {
    

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        localStorage?.removeItem("twk_644562484247f20fefed482e");
        localStorage?.removeItem("twk_token_644562484247f20fefed482e");       
        
        window.scrollBy({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard", 
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
    // console.log("ACTIVE-USER: ", isLoggedIn);
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
    // console.log("Logged-In User Roles: ", userRoles);
    const displayImg = isLoggedIn?.display_img ? isLoggedIn?.display_img : '';
    // console.log("Logged-In User DP: ", displayImg); 
    // const userBio = isLoggedIn?.aboutMe ? isLoggedIn?.aboutMe : '';
    // console.log("Logged-In User BIO: ", userBio);    
    // ***************************************************************************
    // ***************************************************************************



    const [data, setData] = useState([]);
    // console.log("SEARCH RESULTS WHILE CREATING ARTICLE:", data);
    const [totalAdminUsers, setTotalAdminUsers] = useState(null);
    // console.log("TOTAL ADMIN USERS: ", totalAdminUsers);                
    const [totalPages, setTotalPages] = useState(0);
    const [pageLimit, setPageLimit] = useState(undefined); // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);  
   


    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...data));

    function search(data) {
        return data?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };
    // ****************************************************************************
    // ****************************************************************************

    const fetchData = async () =>  {
        // FETCH ALL STAFFS DATA
        await api.get(`/api/v1/admin/posts/manage?page=${currentPage}&limit=${pageLimit}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { allAdminRole, pagination } = data;

            if (!success && message === "No staff found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setData(allAdminRole);
            setPageLimit(pagination?.recordLimit);

            setTotalAdminUsers(pagination?.staffsRecord);
            setTotalPages(pagination?.lastPage);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
        // .finally(() => {
        //    setIsLoading(false);
        // });
    };
    

    




    
    return (
        <>
            {/***** LEFT-PANEL *****/}
            <Sidebar />
            {/***** LEFT-PANEL *****/}


            
            {/***** RIGHT-PANEL *****/}
            <div className="relative md:ml-64 bg-blueGray-100">
                
                {/* Admin NavBar */}                    
                <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                        
                            {/* Brand */}
                            <Link className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                                to={"/admin/dashboard"} onClick={(e) => e.preventDefault()}>Dashboard 
                            </Link>
                            {/* Brand */}


                            {/* Form*/}
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

                                    <button type="submit" onSubmit={fetchData}></button>
                                </div>                                            
                            </form>
                            

                            {/* User */}
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <UserDropdown userId={userId} userEmail={userEmail} displayImg={displayImg} userRoles={userRoles} logOut={logOut} />
                            </ul>
                        </div>
                </nav>
                {/* Admin NavBar */}


                {/* Welcome Logged-In User */}
                <div className="relative bg-blue-900 md:pt-32 pb-32 pt-12">                                 
                    <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                        <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                            Welcome <span className="font-bold text-white">{lastName}</span>
                        </p>
                    </div>     
  
                    <HeaderStats />
                </div>
                {/* Welcome Logged-In User */}


                {/* View */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                    <DashboardTable />                    
                </div>
                {/* View */}

            </div>
            {/***** RIGHT-PANEL *****/}
        </>
    );
};

export default Dashboard;



Dashboard.defaultProps = {
    color: "dark",
};

Dashboard.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
