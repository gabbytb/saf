import { useEffect, } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate, } from "react-router-dom";
import { 
    Sidebar, 
    AdminNavbar, 
    NewBlogPost, 
} from "../components";










const DashboardCreateBlog = ({ color, isLoggedIn }) => {

    // console.clear();

    const navigate = useNavigate();
    

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard - CREATE NEW POST", 
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
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    // console.log("Logged-In User Last Name: ", lastName);
    // const email = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    // console.log("Logged-In User E-mail: ", email);
    // ***************************************************************************
    // ***************************************************************************





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

                    {/* Create Blog Post */}
                    <div className="px-4 md:px-10 mx-auto w-full -m-24">                    
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                {/* <> */}
                                <NewBlogPost />
                                {/* </> */}
                            </div>                            
                        </div>
                    </div>                         
                </div>
                {/***** RIGHT-PANEL *****/}
            </>
    );
};

export default DashboardCreateBlog