import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "../Dropdowns/NotificationDropdown";
import UserDropdown from "../Dropdowns/UserDropdown";
import { 
    brandOfficialLogo,
} from "../../assets/images";







export default function Sidebar() {
    
    const [collapseShow, setCollapseShow] = useState("hidden");


    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-164 z-10 py-1 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                   
                    {/* Toggler */}
                    <button className="w-12 cursor-pointer text-black opacity-50 mr-14 sm:mr-32 pl-0 md:hidden md:mr-0 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent" type="button" onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}>
                        <i className="fas fa-bars"></i>
                    </button>
                    {/* Brand */}
                    <Link className="md:flex outline-none justify-center text-left py-0 md:pb-0 md:pt-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0 brand" to="/" target="_blank">
                        <img src={brandOfficialLogo} alt="brand logo" />
                    </Link>
                    {/* Logged-in User */}
                    <ul className="w-32 sm:w-24 m-0 md:hidden justify-end items-center flex flex-nowrap list-none">
                        <li className="inline-block relative items-center">
                            <NotificationDropdown />
                        </li>
                        <li className="inline-block relative m-0">
                            <UserDropdown />
                        </li>
                    </ul>



                    {/* Collapse */}
                    <div className={"md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-0 md:shadow-none shadow absolute top-0 -left-2 right-0 z-40 overflow-y-auto overflow-x-hidden w-full h-screen items-center flex-1 rounded pb-16 " + collapseShow}>                    
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
                    {/* Form */}
                    <form className="mt-6 mb-4 md:hidden">
                        <div className="mb-3 pt-0">
                            <input type="text" placeholder="Search" className="px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"/>
                        </div>
                    </form>



                    {/* Divider for Main Menu */}
                    <hr className="my-4 md:min-w-full" />
                    {/* Heading */}
                    <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-4 pb-4 no-underline">Main Menu</h6>
                    {/* Navigation */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className="items-center">
                            <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/dashboard") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to="/admin/dashboard">
                                <i className={"fas fa-user mr-4 text-2xl " + (window.location.href.indexOf("/admin/dashboard") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Dashboard
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/blog/manage") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to="/admin/blog/manage">
                                <i className={"fas fa-book mr-4 text-2xl " + (window.location.href.indexOf("/admin/blog/manage") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}All Posts
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className={"uppercase py-3 text-xl font-bold block " + (window.location.href.indexOf("/admin/blog/manage/create") !== -1 ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500")} to="/admin/blog/manage/create">
                                <i className={"fas fa-book mr-4 text-2xl " + (window.location.href.indexOf("/admin/blog/manage/create") !== -1 ? "opacity-75" : "text-blueGray-300")}></i>{" "}Add New Post
                            </Link>
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



                    {/* Divider for Auth Layout Pages
                    <hr className="my-4 md:min-w-full" /> */}
                    {/* Heading 
                    <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Auth Layout Pages</h6>*/} 
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
                    </ul>*/}

                    

                    {/***************************************/}
                    {/*********** Manage Accounts ***********/}
                    {/***************************************/}
                    {/* Divider */}
                    <hr className="my-4 md:min-w-full" />
                    {/* Heading */}
                    <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Manage Accounts</h6>
                    {/* Navigation */}
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
                        {/* <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/landing">
                                <i className="fas fa-newspaper text-blueGray-400 mr-2 text-sm"></i>{" "}Landing Page
                            </Link>
                        </li> */}
                        <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xl uppercase py-3 font-bold block" to="/admin/users">
                                <i className="fas fa-users text-blueGray-400 mr-4 text-2xl"></i>{" "}Users
                            </Link>
                        </li>

                        <li className="items-center">
                            <Link className="text-blueGray-700 hover:text-blueGray-500 text-xl uppercase py-3 font-bold block" to="/admin/staffs">
                                <i className="fas fa-user-circle text-blueGray-400 mr-4 text-2xl"></i>{" "}Staffs
                            </Link>
                        </li>
                    </ul>
                    {/***************************************/}
                    {/*********** Manage Accounts ***********/}
                    {/***************************************/}



                    {/* Divider */}
                    {/* <hr className="my-4 md:min-w-full" /> */}
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
            </nav>
        </>
    );
};
