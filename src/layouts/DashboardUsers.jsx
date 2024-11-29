import { Suspense, useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";

import api from "../api";
import { spinner } from "../assets/images";
import sketch from "../assets/img/sketch.jpg";
import "../assets/styles/tailwind.css";

// components
import { 
    Sidebar,  
    UserDropdown,
} from "../components";

// views
import {  
    UsersTable,
} from "../views";







const DashboardUsers = ({ color, isLoggedIn }) => {


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Users Dashboard", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //




    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        const redirToLOGIN = "/user/login";
        window.location.replace(redirToLOGIN);
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    // ***************************************************************************
    // ***************************************************************************




    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL STAFFS
    // ****************************************************************************
    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [allUsers, setAllUsers] = useState([]);
    // console.log("ALL USERS: ", allUsers);
        const [totalApprovedUsers, setTotalApprovedUsers] = useState();
        const [totalPendingUsers, setTotalPendingUsers] = useState();
        const [totalRejectedUsers, setTotalRejectedUsers] = useState();

    // eslint-disable-next-line
    const [totalUsers, setTotalUsers] = useState(null);
    // console.log("TOTAL USERS: ", totalUsers);
    
    const [totalPages, setTotalPages] = useState(0);
    const [pageLimit, setPageLimit] = useState(undefined); // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);  


    
    
    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...allUsers));

    function search(data) {
        return data?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };
    // ****************************************************************************
    // ****************************************************************************



    
    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("allUsers");
    const leftArrow = "<", 
          rightArrow = ">";



        
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
                    const { usersList, pagination } = data;

                    if (!success && message === "No user found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllUsers(usersList);
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
                

                await api.get(`/api/v1/admin/users/manage/approvedUsers`)
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


                await api.get(`/api/v1/admin/users/manage/pendingUsers`)
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


                await api.get(`/api/v1/admin/users/manage/rejectedUsers`)
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
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 w-98 h-178">
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
            
                        {/* User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <UserDropdown />
                        </ul>

                    </div>
                </nav>
                {/* <AdminNavbar /> */}
  
                
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
                            <UsersTable />     
                        </div>
                    </div>        
                </div>
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