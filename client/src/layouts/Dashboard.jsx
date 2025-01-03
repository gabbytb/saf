import { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import api from "../api";
import "../assets/styles/tailwind.css";

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














function logEvent(message, mode = 'TRACKER') {
    // Send the log to a backend server
    // const payload = new Date().toISOString() + (3600); 

    const payload = new Date(new Date().toISOString() + (3600));
    console.log("newTime: ", payload);

    // const nigeriaTime = new Date(payload);
    // console.log("nigeriaTime: ", nigeriaTime);

    // console.log("newTime.getTime(): ", newTime.getTime()); 
    // console.log("newTime.getTime() + (3600): ", newTime.getTime() + (3600)); 
    
    // const nigeriaTimeMillis = newTime.getTime() + (3600); // Add 1 hour in milliseconds
    // Step 3: Convert the adjusted time to a new Date object to get Current Nigerian Time        
    // const nigeriaTime = new Date(nigeriaTimeMillis);
    api.post('/api/logs', {
        message,
        mode,
        timestamp: new Date().toISOString(),
        // timestamp: payload,
    });
};





const Dashboard = ({ isLoggedIn }) => {
    


    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    // Send log to backend server     
    function logLogout(message = "You are Logged out", mode = "TRACKER") {
        api.post("/api/logs", {
            message,
            mode,
            timestamp: new Date().toISOString(),
        })
        .then((response) => {
            const { servermessage } = response.data;              
            localStorage.setItem('sessionend', servermessage);
        }) 
        .catch((error) => {
            console.log('Error encountered during logging of MAIN DASHBOARD', error.message);
        });
    };
    function logOut() {      
        // log out function to log the user out of google and set the profile array to null    
        googleLogout();      
        // Clear User Details from Local Storage
        localStorage.clear();
        // Record Activity
        logLogout();
        // redirect to Login Page    
        const redirToLogin = "/user/login";
        window.location.replace(redirToLogin);      
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
    const displayImg = isLoggedIn?.displayImg ? isLoggedIn?.displayImg : '';
    // console.log("Logged-In User DP: ", displayImg); 
    // const userBio = isLoggedIn?.aboutMe ? isLoggedIn?.aboutMe : '';
    // console.log("Logged-In User BIO: ", userBio);    
    // ***************************************************************************
    // ***************************************************************************



    
    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;

        logEvent(`${firstName} ${lastName}[${userEmail}] visited ${pageTitle}`);
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //




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