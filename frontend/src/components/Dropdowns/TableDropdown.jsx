import React from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";




const NotificationDropdown = () => {


    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();

    const openDropdownPopover = () => {
      
      createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
          placement: "top-end",
        });
        setDropdownPopoverShow(true);

    };

    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };


    return (
        <>
          <Link
            className="text-blueGray-500 py-1 px-3"
            to="#"
            ref={btnDropdownRef}
            onClick={(e) => {
              e.preventDefault();
              dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
            }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </Link>
          <div
            ref={popoverDropdownRef}
            className={
              (dropdownPopoverShow ? "block" : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            }
          >
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              Action
            </a>
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              Another action
            </a>
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              Something else here
            </a>
          </div>
        </>
    );
};

export default NotificationDropdown;
