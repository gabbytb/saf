import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { 
    brandOfficialLogo,
} from "../../assets/images";







const Sidebar = ({ isLoggedIn }) => {
    

    const [collapseShow, setCollapseShow] = useState("hidden");
 
   


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
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        const redirToLOGIN = "/user/login";
        navigate(redirToLOGIN);
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const userId = isLoggedIn?.id ? isLoggedIn?.id : logOut();
    // console.log("Logged-In User ID: ", userId);
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




    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-164 z-10">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-9/8 md:w-full mx-auto">
                   
                    {/* Toggler */}
                    <button className="w-12 cursor-pointer text-black opacity-50 mr-14 sm:mr-32 pl-0 md:hidden md:mr-0 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button" onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}>
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Toggler */}


                    {/* Brand */}
                    <Link className="md:flex outline-none justify-center text-left md:pb-0 md:pt-2 text-blueGray-600 bg-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0 py-1 brand" to="/" target="_blank">
                        <img src={brandOfficialLogo} alt="brand logo" />
                    </Link>
                    {/* Brand */}

                    
                    {/* Logged-in User */}
                    <ul className="w-32 sm:w-24 m-0 md:hidden justify-end items-center flex flex-nowrap list-none">
                        <li className="inline-block relative items-center">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative m-0">
                            <UserDropdown displayImg={displayImg} userId={userId} userEmail={userEmail} userRoles={userRoles} logOut={logOut} />
                        </li>
                    </ul>
                    {/* Logged-in User */}


                    {/* Collapse */}
                    <div className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-0 md:shadow-none shadow absolute top-0 -left-2 right-0 z-40 overflow-y-auto overflow-x-hidden w-full h-screen items-center flex-1 rounded gap-2 px-0 pb-16 " + collapseShow}>                    
                    
                        {/* Collapse header */}
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">                                
                                <div className="w-6/12">
                                    <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" to="/">My Dashboard </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button type="button" className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" onClick={() => setCollapseShow("hidden")}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Collapse header */}



                        {/* Form */}
                        <form className="mt-6 mb-4 md:hidden">
                            <div className="mb-3 pt-0">
                                <input type="text" placeholder="Search" className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"/>
                            </div>
                        </form>
                        {/* Form */}



                        {/***************************************/}
                        {/***********    Main Menu    ***********/}
                        {/***************************************/}
                        {/* Divider for Main Menu */}
                        <hr className="my-4 md:min-w-full" />                   

                        <div className="px-6">   

                            {/* Heading */}
                            <h6 className="md:min-w-full text-blueGray-500 text-base uppercase font-bold block py-4 m-0 no-underline">Main Menu</h6>
                            {/* Heading */}


                            {/* Navigation */}
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                                <li className="items-center">
                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/dashboard") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/dashboard"}>
                                        <div className="flex flex-row">
                                            <div className={"mr-2 " + (window.location.href.indexOf("/admin/dashboard") !== -1 ? "border-2 border-orange-500" : "hidden")}></div>
                                            <i className={"fas fa-user ml-2 mr-4 text-2xl " + (window.location.href.indexOf("/admin/dashboard") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Dashboard
                                        </div>
                                    </Link>
                                </li>


                                <li className="items-center cursor-pointer relative text-left flex flex-col"> 
                                    <label className="w-full">
                                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                        <span className="block max-h-14 max-w-xl overflow-hidden rounded-lg p-0 text-cyan-800 transition-all duration-300 peer-checked/showLabel:max-h-52">
                                            <p className={"uppercase flex flex-row items-center pt-1 pb-3 text-xl font-bold " + (window.location.href.indexOf("/admin/blog/") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")}>                                
                                                <div className={"mr-2 " + (window.location.href.indexOf("/admin/blog/") !== -1 ? "border-2 border-orange-500 h-8" : "hidden")}></div>
                                                <i className={"fas fa-bible ml-2 mr-5 h-14 text-2xl flex items-center " + (window.location.href.indexOf("/admin/blog/") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Blog
                                                <svg
                                                    className="ml-auto mr-1 h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path                                               
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="4"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>                           
                                            </p>


                                            <ul className="mb-2">
                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/blog/manage") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/blog/manage"}>
                                                        <i className={"fas fa-book ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/blog/manage") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}All Posts
                                                    </Link>
                                                </li>

                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/blog/create") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/blog/create"}>
                                                        <i className={"fas fa-add ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/blog/create") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}New Post
                                                    </Link>
                                                </li>
                                            </ul>                                                               
                                        </span>
                                    </label>                           
                                </li>
                            

                                <li className="items-center cursor-pointer relative text-left flex flex-col"> 
                                    <label className="w-full">
                                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                        <span className="block max-h-14 max-w-xl overflow-hidden rounded-lg p-0 text-cyan-800 transition-all duration-300 peer-checked/showLabel:max-h-52">
                                            <p className={"uppercase flex flex-row items-center pt-1 pb-3 text-xl font-bold " + (window.location.href.indexOf("/admin/donations/") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")}>                                
                                                <div className={"mr-2 " + (window.location.href.indexOf("/admin/donations/") !== -1 ? "border-2 border-orange-500 h-8" : "hidden")}></div>
                                                <i className={"fas fa-solid fa-hand-holding-heart ml-1 mr-4 h-14 text-2xl flex items-center " + (window.location.href.indexOf("/admin/donations/") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Donations
                                                <svg
                                                    className="ml-auto mr-1 h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path                                               
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="4"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>                           
                                            </p>


                                            <ul className="mb-2">
                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/donations/manage") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/donations/manage"}>
                                                        <i className={"fas fa-gear ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/donations/manage") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Manage Donations
                                                    </Link>
                                                </li>

                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/donations/history") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/donations/history"}>
                                                        <i className={"fas fa-solid fa-credit-card ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/donations/history") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Payment History
                                                    </Link>
                                                </li>
                                            </ul>                                                               
                                        </span>
                                    </label>                           
                                </li>


                                <li className="items-center cursor-pointer relative text-left flex flex-col"> 
                                    <label className="w-full">
                                        <input className="peer/showLabel absolute scale-0" type="checkbox" />
                                        <span className="block max-h-14 max-w-xl overflow-hidden rounded-lg p-0 text-cyan-800 transition-all duration-300 peer-checked/showLabel:max-h-64">
                                            <p className={"uppercase flex flex-row items-center pt-1 pb-3 text-xl font-bold " + (window.location.href.indexOf("/admin/products/") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")}>                                
                                                <div className={"mr-2 " + (window.location.href.indexOf("/admin/products/") !== -1 ? "border-2 border-orange-500 h-8" : "hidden")}></div>
                                                <i className={"fas fa-solid fa-store fa-hand-holding-heart ml-1 mr-4 h-14 text-2xl flex items-center " + (window.location.href.indexOf("/admin/products/") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Shop
                                                <svg
                                                    className="ml-auto mr-1 h-5 w-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path                                               
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="4"
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>                           
                                            </p>


                                            <ul className="mb-2">
                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/products/manage") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/products/manage"}>
                                                        <i className={"fas fa-gear ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/products/manage") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Manage Products
                                                    </Link>
                                                </li>

                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/products/orders") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/products/orders"}>
                                                        <i className={"fas fa-solid fa-cart-arrow-down ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/products/orders") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Orders                                                    
                                                    </Link>
                                                </li>

                                                <li className="items-center">
                                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/products/revenue") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/products/revenue"}>
                                                        <i className={"fas fa-solid fa-money-bill-trend-up ml-6 mr-4 text-2xl " + (window.location.href.indexOf("/admin/products/revenue") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Revenue                                                    
                                                    </Link>
                                                </li>
                                            </ul>                                                               
                                        </span>
                                    </label>                           
                                </li>
                                
                                {/*<li className="items-center">
                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/tables") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to="/admin/tables">
                                        <i className={"fas fa-table mr-4 text-2xl " + (window.location.href.indexOf("/admin/tables") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Tables
                                    </Link>
                                </li>

                                <li className="items-center">
                                    <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/maps") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to="/admin/maps">
                                        <i className={"fas fa-map-marked mr-4 text-2xl " + (window.location.href.indexOf("/admin/maps") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Maps
                                    </Link>
                                </li>*/}
                            </ul>
                            {/* Navigation */}
                                            

                            {/* Divider for Auth Layout Pages
                            <hr className="my-4 md:min-w-full" /> */}

                            
                            {/* Heading 
                            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Auth Layout Pages</h6> */}


                            {/* Navigation 
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                                <li className="items-center">
                                    <Link className="text-blueGray-700 hover:text-blueGray-500 text-xl uppercase py-3 font-bold block" to="/auth/login">
                                        <i className="fas fa-fingerprint text-blueGray-400 mr-4 text-2xl"></i>{" "}Login
                                    </Link>
                                </li>

                                <li className="items-center">
                                    <Link className="text-blueGray-700 hover:text-blueGray-500 text-xl uppercase py-3 font-bold block" to="/auth/register">
                                        <i className="fas fa-clipboard-list text-blueGray-300 mr-4 text-2xl"></i>{" "}Register
                                    </Link>
                                </li>
                            </ul> */}
                        </div>


                            
                        {/***************************************/}
                        {/********   Manage Accounts   **********/}
                        {/***************************************/}
                        {/* Divider for Account Settings */}
                        <hr className="my-4 md:min-w-full" />

                        <div className="px-6">
                            
                            {/* Heading */}
                            <h6 className="md:min-w-full text-blueGray-500 text-base uppercase font-bold block pt-1 pb-4 m-0 no-underline">Manage Accounts</h6>
                            
                            {/* Navigation */}
                            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                                    <li className="items-center">
                                        <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/users") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/users"}>
                                            <div className="flex flex-row">
                                                <div className={"mr-2 " + (window.location.href.indexOf("/admin/users") !== -1 ? "border-2 border-orange-500" : "hidden")}></div>
                                                <i className={"fas fa-user ml-2 mr-4 text-2xl " + (window.location.href.indexOf("/admin/users") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Users
                                            </div>
                                        </Link>
                                    </li>

                                    <li className="items-center">
                                        <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/staffs") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to={"/admin/staffs"}>
                                            <div className="flex flex-row">
                                                <div className={"mr-2 " + (window.location.href.indexOf("/admin/staffs") !== -1 ? "border-2 border-orange-500" : "hidden")}></div>                                                                           
                                                <i className={"fas fa-users ml-1 mr-3 text-2xl " + (window.location.href.indexOf("/admin/staffs") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Staffs
                                            </div>
                                        </Link>
                                    </li>                    
                            </ul>
                            {/***************************************/}
                            {/*********** Manage Accounts ***********/}
                            {/***************************************/}
                        </div>
                      
                        {/* Divider */}
                        {/* <hr className="my-4 md:min-w-full" /> */}  
                        
                        <div className="px-6">

                                {/* Heading */}
                                {/* <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Documentation</h6> */}
                                {/* Navigation */}
                                {/* <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fas fa-paint-brush mr-2 text-blueGray-300 text-base"></i>Styles
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-css3-alt mr-2 text-blueGray-300 text-base"></i>CSS Components
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-angular mr-2 text-blueGray-300 text-base"></i>Angular
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-js-square mr-2 text-blueGray-300 text-base"></i>Javascript
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-react mr-2 text-blueGray-300 text-base"></i>NextJS
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-react mr-2 text-blueGray-300 text-base"></i>React
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                    <Link to="https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fas fa-link mr-2 text-blueGray-300 text-base"></i>Svelte
                                        </Link>
                                    </li>

                                    <li className="inline-flex">
                                        <Link to="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus" target="_blank" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                                            <i className="fab fa-vuejs mr-2 text-blueGray-300 text-base"></i>VueJS
                                        </Link>
                                    </li>
                                </ul> */}

                        </div>

                    </div>
                    {/* Collapse */}

                </div>
            </nav>
        </>
    );
};

export default Sidebar;