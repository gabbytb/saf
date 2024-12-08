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
    CardAllApprovedStaffs, CardAllPendingStaffs, CardAllRejectedStaffs, 
    TableDropdown, 
    UserDropdown, 
} from "../components";

// views
// import { StaffsTable } from "../views";










const DashboardBlogPosts = ({ color, isLoggedIn }) => {

   
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Blog Posts", siteTitle = "Samuel Akinola Foundation";
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
    const [blogPosts, setBlogPosts] = useState([]);
    console.log("ALL BLOG POSTS: ", blogPosts);

    const [totalBlogPosts, setTotalBlogPosts] = useState(null);
    // console.log("TOTAL BLOG POSTS: ", totalBlogPosts);

        const [totalPublishedPosts, setTotalPublishedPosts] = useState(null);
        const [totalDraftPosts, setTotalDraftPosts] = useState(null);
        const [totalScheduledPosts, setTotalScheduledPosts] = useState(null);

    const [totalPages, setTotalPages] = useState(0);

    // Number of items per page
    const [pageLimit, setPageLimit] = useState(undefined);
    console.log("PAGE LIMIT: ", pageLimit);

    const [currentPage, setCurrentPage] = useState(1);
   
    const leftArrow = "<", 
          rightArrow = ">";


    
    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("blogPosts");

    useEffect(() => {
        var allStaffsLink = document.querySelector("#staffsLinkID .allStaffs");        
        if (activeDisplay === "allStaffs") {
            setCurrentPage(1);
            allStaffsLink?.classList?.add("activeStaffView");          
        } else {
            allStaffsLink?.classList.remove("activeStaffView");     
        };
    }, [activeDisplay]);
    // ****************************************************************************
    // ****************************************************************************  



    // ****************************************************************************            
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL STAFFS
    // ****************************************************************************             
    async function fetchAllBlogPosts() {
        await api.get(`/api/v1/admin/posts/manage?page=${currentPage}&limit=${pageLimit}`)
        .then((response) => {
                    const { success, data, message } = response.data;
                    const { staffsList, pagination } = data;

                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setBlogPosts(staffsList);
                    setPageLimit(pagination?.recordLimit);

                    setTotalBlogPosts(pagination?.postsRecord);
                    setTotalPages(pagination?.lastPage);
        })
        .catch((error) => {
                    console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });


        await api.get(`/api/v1/admin/posts/manage/publishedPosts`)
        .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalPublishedPosts(data);
        })
        .catch((error) => {
                    console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v1/admin/posts/manage/draftPosts`)
        .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalDraftPosts(data);
        })
        .catch((error) => {
                    console.log("Error fetching data: ", error);
        });


        await api.get(`/api/v1/admin/posts/manage/scheduledPosts`)
        .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalScheduledPosts(data);
        })
        .catch((error) => {
                    console.log("Error fetching data: ", error);
        });
    };

    useEffect(() => {                                 
        if (activeDisplay === "blogPosts") {

            setIsLoading(true);           

            var timer = setTimeout(fetchAllBlogPosts, 300);   // Delay execution of findAllStaffs by 1800ms
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

    

    // ****************************************************************************            
    // ****************************************************************************
    // Works for Search
    // ****************************************************************************
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...blogPosts));

    function search(blogPosts) {
        return blogPosts?.filter((item) =>
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


                            {/* Search */}
                            <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 w-98 h-178">
                                <div className="relative flex w-full flex-wrap items-stretch">                      
                                    <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                        <i className="fas fa-search"></i>
                                    </span>
                                        
                                    <input
                                        type="search"
                                            name="q"
                                            id="search-form"
                                            className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search user"
                                    />

                                    <button type="submit" onSubmit={fetchAllBlogPosts}></button>
                                </div>                                             
                            </form>
                

                            {/* LoggedIn User */}
                            <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                                <UserDropdown />
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
        
                                    <div className={`w-full overflow-x-auto ${activeDisplay === "allBlogPosts" ? "block" : "hidden"}`}>
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
                        {/* Brand */}


                        {/* Search */}
                        <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12 w-98 h-178">
                            <div className="relative flex w-full flex-wrap items-stretch">                      
                                <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                                    <i className="fas fa-search"></i>
                                </span>
                                    
                                <input
                                    type="search"
                                        name="q"
                                        id="search-form"
                                        className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search user"
                                />

                                <button type="submit" onSubmit={fetchAllBlogPosts}></button>
                            </div>                                             
                        </form>
            

                        {/* LoggedIn User */}
                        <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                            <UserDropdown />
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


                 {/* Admins Table */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full mb-12 px-4">         
                            <div
                                className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                }>

                                
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
                                        All Articles
                                        </h3>
                                    </div>
                                    </div>
                                </div>
                                {/* Page Title */}

                            </div>
                        </div>
                    </div>                  
                </div>
            </div>            
            {/***** RIGHT-PANEL *****/}            
        </>
    );
};

export default DashboardBlogPosts;



DashboardBlogPosts.defaultProps = {
    color: "dark",
};
  
DashboardBlogPosts.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
