import { useEffect, } from "react";
import { useNavigate, } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { Sidebar, AdminNavbar, CardCreateAccount, } from "../components";







const DashboardCreateAccount = ({ isLoggedIn }) => {

    // console.clear();

    const navigate = useNavigate();
    

    
    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.removeItem("user");
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        // const redirToLOGIN = "/user/login";
        // window.location.replace(redirToLOGIN);
        navigate("/user/login");
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const firstName = isLoggedIn?.first_name ? isLoggedIn?.first_name : logOut();
    // console.log("Logged-In User First Name: ", firstName);
    const lastName = isLoggedIn?.last_name ? isLoggedIn?.last_name : logOut();            
    // console.log("Logged-In User Last Name: ", lastName);
    // const email = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    // console.log("Logged-In User E-mail: ", email);
    // ***************************************************************************
    // ***************************************************************************


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = `${firstName} ${lastName} init - New Account`,
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, [firstName, lastName]);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    return (
            <>
                {/***** LEFT-PANEL *****/}
                <Sidebar />
                {/***** LEFT-PANEL *****/}
                

                
                {/***** RIGHT-PANEL *****/}
                <div className="relative md:ml-64 bg-blueGray-100">
                    <AdminNavbar />
                    
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

                    {/* View User Details*/}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">                    
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                
                                {/* NEW User Details */}
                                <CardCreateAccount />
                                {/* NEW User Details */}

                            </div>
                        </div>
                    </div>                         
                </div>
                {/***** RIGHT-PANEL *****/}
            </>
    );
};


export default DashboardCreateAccount;