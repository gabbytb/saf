import { useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import PropTypes from "prop-types";
import "../assets/styles/tailwind.css";

// components
import { Sidebar, AdminNavbar, HeaderStats, } from "../components";

// views
import { DashboardTable, } from "../views";









const Dashboard = ({ isLoggedIn }) => {

    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard", 
              siteTitle = "Samuel Akinola Foundation";
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
    const lastName = isLoggedIn?.last_name ? isLoggedIn?.last_name : logOut();
    // ***************************************************************************
    // ***************************************************************************



    

    return (
        <>
            {/***** LEFT-PANEL *****/}
            <Sidebar />
            {/***** LEFT-PANEL *****/}


            
            {/***** RIGHT-PANEL *****/}
            <div className="relative md:ml-64 bg-blueGray-100">
                
                {/* Header */}
                <AdminNavbar />
                {/* Header */}


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