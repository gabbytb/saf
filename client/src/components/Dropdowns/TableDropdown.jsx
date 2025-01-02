import { createRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";






const NotificationDropdown = ({ post }) => {


    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const btnDropdownRef = createRef();
    const popoverDropdownRef = createRef();




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
              (dropdownPopoverShow ? "block " : "hidden ") +
              "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
            }
          >
            <Link
              to={`/admin/donations/manage/${post?._id}`}
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              view campaign
            </Link>
            <a
              href="#pablo"
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              pause campaign
            </a>
            <Link
              to={`/admin/donations/manage/delete/${post?._id}`}
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
              }
              onClick={(e) => e.preventDefault()}
            >
              delete campaign
            </Link>
          </div>
        </>
    );
};

export default NotificationDropdown;
