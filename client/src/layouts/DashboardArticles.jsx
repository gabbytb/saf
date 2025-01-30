import { useState, useEffect, Suspense, } from "react";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import setNigerianTime from "../middlewares/setNigerianTime";
import "../assets/styles/tailwind.css";

// components
import { 
    spinner 
} from "../assets/images";
import { 
    Sidebar,
    UserDropdown,
    CardAllPublishedPosts, CardAllDraftPosts,
    TableDropdown,    
} from "../components";

// views
// import { StaffsTable } from "../views";








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



const DashboardArticles = ({ color, isLoggedIn }) => {


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Dashboard - Manage Blog", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
        logEvent(`${firstName} ${lastName} [${userEmail}] visited ${pageTitle}`);
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //


    
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
    // MANAGE STATE:-  TO FIND ALL STAFFS
    // ****************************************************************************
    const [blogPosts, setBlogPosts] = useState([]);
    // console.log("ALL BLOG POSTS: ", blogPosts);
    const [totalBlogPosts, setTotalBlogPosts] = useState(null);
    // console.log("TOTAL BLOG POSTS: ", totalBlogPosts);
        const [totalPublishedPosts, setTotalPublishedPosts] = useState(null);
        // console.log("TOTAL PUBLISHED POSTS: ", totalPublishedPosts);
        const [totalDraftPosts, setTotalDraftPosts] = useState(null);
        // console.log("TOTAL DRAFT POSTS: ", totalDraftPosts);
        // const [totalScheduledPosts, setTotalScheduledPosts] = useState(null);
        // console.log("TOTAL SCHEDULED POSTS: ", totalScheduledPosts);

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
    const [activeDisplay, setActiveDisplay] = useState("blogPosts");

    useEffect(() => {
        var allPostsLink = document.querySelector("#postsLinkID .blogPosts");        
        if (activeDisplay === "blogPosts") {
            setCurrentPage(1);
            allPostsLink?.classList?.add("activePostView");          
        } else {
            allPostsLink?.classList.remove("activePostView");     
        };
    }, [activeDisplay]);
    // ****************************************************************************
    // ****************************************************************************  




    // ****************************************************************************            
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL STAFFS
    // ****************************************************************************             
    useEffect(() => {                                 
        if (activeDisplay === "blogPosts") {
                        
            setIsLoading(true);           

            var timer = setTimeout(fetchAllBlogPosts, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                    clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };

        };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    
    async function fetchAllBlogPosts() {               
        await api.get(`/api/v1/admin/posts/manage?page=${currentPage}&limit=${pageLimit}`)
        .then((response) => {
                    const { success, data, message } = response.data;
                    const { allBlogPosts, pagination } = data;

                    if (!success && message === "No post found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setBlogPosts(allBlogPosts);
                    setPageLimit(pagination?.postLimit);

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
            if (!success && message === "No post found") {
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
            if (!success && message === "No post found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };
    
            setTotalDraftPosts(data);
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
    const search_parameters = Object.keys(Object.assign({}, ...blogPosts));

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

                                    <button type="submit" onSubmit={fetchAllBlogPosts}></button>
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


                    {/* Posts Table */}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">   
            
                        <div className="flex flex-wrap mt-4">
                            <div className="w-full mb-12 px-4">
                                <div
                                    className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                    }>
                                        
        
                                    {/* Blog Navigation */}
                                    <div id="postsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                        <Link className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span> </Link>
                                        <Link className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published <span className="off_white"> ({ totalPublishedPosts })</span></Link>
                                        <Link className="draftPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("draftPosts")}>Drafts <span className="off_white"> ({ totalDraftPosts })</span></Link>
                                        {/* <Link className="scheduledPosts pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledPosts")}>Scheduled  <span className="off_white"> ({ totalBlogPosts })</span></Link> */}
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
                                                    All Posts
                                                </h3>

                                                <Link className="relative -top-2" to={'/admin/blog/create'} alt='create new article'>
                                                    <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Page Title */}
        
        
                                    <div className={`w-full overflow-x-auto ${activeDisplay === "blogPosts" ? "block" : "hidden"}`}>
                                        {/* Blog Posts table */}
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
                                                        Title
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Excerpt
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

                                <button type="submit" onSubmit={fetchAllBlogPosts}></button>
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

                
                {/* Post Table */}
                <div className="px-4 md:px-10 mx-auto w-full -m-24">               
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full mb-12 px-4">         
                            <div
                                className={
                                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                                }>



                                {/* Posts Navigation */}
                                <div id="postsLinkID" className="flex flex-row flex-wrap gap-3 mt-8 mb-10 px-7">
                                    <Link className="blogPosts activePostView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("blogPosts")}>All <span className="off_white"> ({ totalBlogPosts })</span></Link>
                                    <Link className="publishedPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("publishedPosts")}>Published  <span className="off_white"> ({ totalPublishedPosts })</span></Link>
                                    <Link className="draftPosts pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("draftPosts")}>Drafts  <span className="off_white"> ({ totalDraftPosts })</span></Link>
                                    {/* <Link className="scheduledPosts pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row gap-1 bg-white" onClick={() => setActiveDisplay("scheduledPosts")}>Scheduled  <span className="off_white"> ({ totalBlogPosts })</span></Link> */}
                                </div> 
                                {/* Posts Navigation */}


                                
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
                                                All Posts
                                            </h3>

                                            <Link className="relative -top-2" to={'/admin/blog/create'} alt='create new article'>
                                                <button className="bg-blue-500 text-white active:bg-lightBlue-500 font-bold uppercase text-lg tracking-tightener px-7 py-3 rounded-lg shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-300">add new</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}



                                {/* Views */}
                                <div className={`w-full overflow-x-auto ${activeDisplay === "blogPosts" ? "block" : "hidden"}`}>
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
                                                        Post Title
                                                    </th>
                                                    <th
                                                        className={
                                                            "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                                            (color === "light"
                                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                            : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                                                        }
                                                    >
                                                        Date Published
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
                                        {search(blogPosts)?.length !== 0 ?
                                                <tbody>                                                    
                                                    {search(blogPosts)?.map((post, userIndex) => {
                                                            if (post?.status === "draft") {
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
                                                                                {post?.title?.substring(0,50)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-orange-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
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
                                                                                {post?.title?.substring(0,50)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-yellow-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
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
                                                                                {post?.title?.substring(0,50)+"..."}
                                                                            </span>
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                                            {convertDate(post?.createdAt)}                        
                                                                        </td>
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                                            <i className="fas fa-circle text-green-500 mr-2"></i>{post?.status}
                                                                        </td>  
                                                                        <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                                            <Link to={`/admin/blog/manage/${post?._id}`}>View details</Link>
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
                                                        <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No post found</td>
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
                                <Suspense fallback={<div>Loading...</div>}>                
                                    <CardAllPublishedPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                </Suspense>       
                                <Suspense fallback={<div>Loading...</div>}>                            
                                    <CardAllDraftPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} leftArrow={leftArrow} rightArrow={rightArrow} />
                                </Suspense>     
                                {/* <Suspense fallback={<div>Loading...</div>}>
                                    <CardAllScheduledPosts color={color} activeDisplay={activeDisplay} search={search} pageLimit={pageLimit} />
                                </Suspense> */}
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

export default DashboardArticles;



DashboardArticles.defaultProps = {
    color: "dark",
};
  
DashboardArticles.propTypes = {
    color: PropTypes.oneOf(["light", "dark"]),
};
