import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import sketch from '../../../assets/img/sketch.jpg';

// components
import { TableDropdown } from "../..";
import { spinner } from "../../../assets/images";






export default function CardAllRejectedStaffs({ color, activeDisplay, search, pageLimit, leftArrow, rightArrow, }) {


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL REJECTED ADMIN USERS
    // ****************************************************************************
    const [allRejectedStaffs, setAllRejectedStaffs] = useState([]);
    // console.log("ALL REJECTED ADMIN USERS: ", allRejectedStaffs);
    
    // eslint-disable-next-line
    const [totalRejectedAdminUsers, setTotalRejectedAdminUsers] = useState(null);
    // console.log("TOTAL REJECTED ADMIN USERS: ", totalRejectedAdminUsers);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
   
    // Number of items per page
    // console.log("PAGE LIMIT: ", pageLimit);


    
    
    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    



    
    useEffect(() => {
      var allRejectedStaffsLink = document.querySelector("#staffsLinkID .allRejectedStaffs");
      // console.log("ALL REJECTED STAFFS LINK", allRejectedStaffsLink);
      if (activeDisplay === "allRejectedStaffs") {
          allRejectedStaffsLink?.classList.add("activeStaffView");
      } else {
          allRejectedStaffsLink?.classList.remove("activeStaffView");
      };
    }, [activeDisplay]);
  
    useEffect(() => {
        if (activeDisplay === "allRejectedStaffs") {

            setIsLoading(true);
            
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL REJECTED STAFFS
            // ****************************************************************************             
            async function fetchAllRejectedStaffs() {
                const rejected = 'rejected';
                await api.get(`/api/v1/auth/account/admins?page=${currentPage}&limit=${pageLimit}&status=${rejected}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { allAdminRole, pagination } = data;

                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllRejectedStaffs(allAdminRole);

                    setTotalRejectedAdminUsers(pagination?.staffsRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            };

            var timerID = setTimeout(fetchAllRejectedStaffs, 300);   // Delay execution of findAllRejectedStaffs by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, search, pageLimit, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // **************************************************************************** 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************



    

    
    if (isLoading) {
        return (
            <>
                <div className={`w-full overflow-x-auto ${activeDisplay === "allRejectedStaffs" ? "block" : "hidden"}`}>
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
                    <tbody className='w-16 h-16 '>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="max-w-40 h-60 flex flex-col justify-center items-center">                                
                                {/* <Preloader /> */}
                                <img src={spinner} alt="Spinning" className="ml-80 mx-auto" />                           
                                <p className="text-xl tracking-extratight font-semibold">Loading...</p>
                            </td>
                            <td></td>
                        </tr>                 
                    </tbody>
                  </table>
                </div>       
            </>
        );
    };


    return (
      <>
          <div className={`w-full overflow-x-auto ${activeDisplay === "allRejectedStaffs" ? "block" : "hidden"}`}>
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
              {
                search(allRejectedStaffs)?.length !== 0 ?
                  <tbody>                                                    
                    {
                        search(allRejectedStaffs)?.map((user, userIndex) => {       
                            return (
                                <tr key={userIndex}>
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                      #{userIndex+1}
                                    </td>
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap text-left flex items-center">
                                      <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                      <span
                                        className={
                                          "ml-3 font-bold " +
                                          + (color === "light" ? "text-blueGray-600" : "text-white")
                                        }
                                      >
                                        {user?.firstName} {user?.lastName}
                                      </span>
                                    </td>
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                      {user?.email}
                                    </td>
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                      <i className="fas fa-circle text-red-500 mr-2"></i>{user?.status}
                                    </td> 
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                        <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                    </td>                   
                                    <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                      <TableDropdown />
                                    </td>
                                </tr>               
                            );                          
                        })
                    }
                  </tbody>
                  :
                  <tbody>                    
                      <tr>
                        <td className=""></td>
                        <td className=""></td>
                        <td className="text-left max-w-60 pl-0 h-60 flex justify-start items-center">No record of rejected staff</td>
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
      </>
    );
};