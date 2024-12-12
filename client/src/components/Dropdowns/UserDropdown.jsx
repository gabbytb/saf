import React from "react";
import { googleLogout } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import {
  adminDashboardIcon,  
} from "../../assets/images";







const UserDropdown = ({ isLoggedIn }) => {


      const navigate = useNavigate();


      // dropdown props
      const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
      const btnDropdownRef = React.createRef();
      const popoverDropdownRef = React.createRef();
        
      const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
          placement: "bottom-end",
        });
        setDropdownPopoverShow(true);
      };
      
      const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
      };




      // ***************************************************************************
      // CURRENT ACTIVE USER:-
      // ***************************************************************************
      isLoggedIn = JSON.parse(localStorage.getItem("user"));
      // ***************************************************************************
      // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
      // ***************************************************************************
      function logOut() {
          // Clear User Details from Local Storage
          localStorage.removeItem('user');
          // localStorage.clear();
          // log out function to log the user out of google and set the profile array to null
          googleLogout();
          // redirect to Login Page
          navigate("/user/login");
      };
      // ***************************************************************************
      // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
      // ***************************************************************************
      const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
      const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();    
      // ***************************************************************************
      // ***************************************************************************




    return (
        <>
            <Link ref={btnDropdownRef} to="#pablo" className="text-blueGray-500 block"                 
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover(); 
                }}>
                <div className="flex flex-row space-x-6">
                    <div className="hidden md:flex md:flex-col">
                        <span className="font-bold text-2xl tracking-supertight text-white">
                            {userEmail}
                        </span>
                        {
                             userRoles?.length !==  0 ?
                                userRoles?.map((name, index) => {
                                    var adminRole = 'admin', 
                                        editorRole = 'editor', 
                                        staffRole = 'staff', 
                                        userRole = 'user';                     

                                    if (name?.role === "ROLE_ADMIN")  {
                                        return (
                                            <span key={index} className="text-lg tracking-supertight font-bold text-white capitalize">{adminRole}</span>
                                        );
                                    } else if (name?.role === "ROLE_EDITOR")  {
                                        return (
                                            <span key={index} className="text-lg tracking-supertight font-bold text-white capitalize">{editorRole}</span>
                                        );
                                    } else if (name?.role === "ROLE_STAFF")  {
                                        return (
                                            <span key={index} className="text-lg tracking-supertight font-bold text-white capitalize">{staffRole}</span>
                                        );
                                    } else {
                                        return (
                                            <span key={index} className="text-lg tracking-supertight font-bold text-white capitalize">{userRole}</span>
                                        );
                                    };
                                }) 
                                : 
                                <span className="text-lg tracking-supertight font-bold text-white capitalize">unassigned role</span>
                        }
                    </div>
                    <div className="items-center flex">
                        <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                          <img src={adminDashboardIcon} alt="..." className="w-full rounded-full align-middle border-none shadow-lg" 
                          // src={require("../../assets/img/team-1-800x800.jpg").default} 
                          />
                        </span>
                    </div>
                </div>
            </Link>


            <div ref={popoverDropdownRef} className={(dropdownPopoverShow ? "block " : "hidden ") 
                + "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"}>

                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Action
                </Link>
                
                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Another action
                </Link>

                <Link to="#pablo" onClick={(e) => e.preventDefault()} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Something else here
                </Link>
                
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                
                <Link to="/admin/dashboard?logout" onClick={logOut} className={"text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                    Log Out
                </Link>
            </div>
        </>
    );
};

export default UserDropdown;
