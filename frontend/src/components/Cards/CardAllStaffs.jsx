import { Suspense, useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import sketch from '../../assets/img/sketch.jpg';

// components
import { CardAllApprovedStaffs, CardAllPendingStaffs, CardAllRejectedStaffs, TableDropdown } from "..";
import { spinner } from "../../assets/images";








export default function CardAllStaffs({ color }) {


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL STAFFS
    // ****************************************************************************
    const [allStaffs, setAllStaffs] = useState([]);
    // console.log("ALL STAFFS: ", allStaffs);


    const [totalAdminUsers, setTotalAdminUsers] = useState(null);
    // console.log("TOTAL ADMIN USERS: ", totalAdminUsers);
        const [totalApprovedStaffs, setTotalApprovedStaffs] = useState(null);
        const [totalPendingStaffs, setTotalPendingStaffs] = useState(null);
        const [totalRejectedStaffs, setTotalRejectedStaffs] = useState(null);


    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of items per page
    const leftArrow = "<", rightArrow = ">";


    
    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("allStaffs");


    
    useEffect(() => {
      var allStaffsLink = document.querySelector("#staffsLinkID .allStaffs");
      var allStaffsSpanLink = document.querySelector("#staffsLinkID .allStaffs > .text-back");
      console.log("ALL STAFFS LINK", allStaffsSpanLink);
      if (activeDisplay === "allStaffs") {        
            allStaffsLink?.classList.add("activeStaffView");
            allStaffsSpanLink?.classList.add("text-white");

           
            setIsLoading(true);

            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL STAFFS
            // ****************************************************************************             
            async function fetchAllStaffs() {
                await api.get(`/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { staffsList, pagination } = data;

                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllStaffs(staffsList);
                
                    setTotalAdminUsers(pagination?.staffsRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });


                await api.get(`/api/v1/admin/users/manage/approvedAdmins`)
                .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalApprovedStaffs(data);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                });


                await api.get(`/api/v1/admin/users/manage/pendingAdmins`)
                .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalPendingStaffs(data);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                });


                await api.get(`/api/v1/admin/users/manage/rejectedAdmins`)
                .then((response) => {
                    const { success, data, message } = response.data;              
                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
    
                    setTotalRejectedStaffs(data);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                });
            };

            var timer = setTimeout(fetchAllStaffs, 800);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timer);                  // Clean up timer if component unmounts or token changes
            };
      } else {
        allStaffsSpanLink?.classList.remove("text-white");
          allStaffsLink?.classList.remove("activeStaffView");
      };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
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
              <div
                  className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                  }
                >

                  {/* Staffs Navigation */}
                  <div id="staffsLinkID" className="flex flex-row gap-3 mt-8 mb-10 px-7">
                  <Link className="allStaffs activeStaffView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl" onClick={() => setActiveDisplay("allStaffs")}>All ({ totalAdminUsers })</Link>
                  <Link className="allApprovedStaffs pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl" onClick={() => setActiveDisplay("allApprovedStaffs")}>Approved ({ totalApprovedStaffs })</Link>
                  <Link className="allPendingStaffs pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl" onClick={() => setActiveDisplay("allPendingStaffs")}>Pending ({ totalPendingStaffs })</Link>
                  <Link className="allRejectedStaffs pt-3 pb-2 px-10 rounded-lg border text-xl" onClick={() => setActiveDisplay("allRejectedStaffs")}>Rejected ({ totalRejectedStaffs })</Link>
                  </div>
                  {/* Users Navigation */}

                  
                  {/* Page Title */}
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                          className={
                            "font-semibold text-lg " +
                            (color === "dark" ? "text-blueGray-700" : "text-white")
                          }
                        >
                          All Staffs
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Page Title */}


                  <div className={`w-full overflow-x-auto ${activeDisplay === "allStaffs" ? "block" : "hidden"}`}>
                    {/* Staffs table */}
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
            </>
        );
    };


    return (
        <>
            <div
                className={
                  "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                  (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                }>

                {/* Staffs Navigation */}
                <div id="staffsLinkID" className="flex flex-row gap-3 mt-8 mb-10 px-7">
                  <Link className="allStaffs activeStaffView pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row" onClick={() => setActiveDisplay("allStaffs")}>All  <span className="text-white text-back">({ totalAdminUsers })</span> </Link>
                  <Link className="allApprovedStaffs pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row" onClick={() => setActiveDisplay("allApprovedStaffs")}>Approved  <span className="text-back">({ totalApprovedStaffs })</span></Link>
                  <Link className="allPendingStaffs pt-3 pb-2 px-10 rounded-lg border mr-2 text-xl flex flex-row" onClick={() => setActiveDisplay("allPendingStaffs")}>Pending  <span className="text-back">({ totalPendingStaffs })</span></Link>
                  <Link className="allRejectedStaffs pt-3 pb-2 px-10 rounded-lg border text-xl flex flex-row" onClick={() => setActiveDisplay("allRejectedStaffs")}>Rejected  <span className="text-back">({ totalRejectedStaffs })</span></Link>
                </div>
                {/* Users Navigation */}

                
                {/* Page Title */}
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3
                        className={
                          "font-semibold text-lg " +
                          (color === "dark" ? "text-blueGray-700" : "text-white")
                        }
                      >
                        All Staffs
                      </h3>
                    </div>
                  </div>
                </div>
                {/* Page Title */}


                {/* Views */}
                <div className={`w-full overflow-x-auto ${activeDisplay === "allStaffs" ? "block" : "hidden"}`}>
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
                        allStaffs?.length !== 0 ?
                          <tbody>                                                    
                            {
                                allStaffs?.map((user, userIndex) => {
                                    if (user?.status === "pending") {
                                        return (
                                            <tr key={userIndex}>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap">
                                                  #{userIndex+1}
                                                </td>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight whitespace-nowrap text-left flex items-center capitalize">
                                                  <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                                  <span
                                                    className={
                                                      "ml-3 font-bold " +
                                                      +(color === "light" ? "text-blueGray-600" : "text-white")
                                                    }
                                                  >
                                                    {user?.firstName} {user?.lastName}
                                                  </span>
                                                </td>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                  {user?.email}
                                                </td>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                  <i className="fas fa-circle text-orange-400 mr-2"></i>{user?.status}
                                                </td>                  
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                    <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                                </td>    
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                  <TableDropdown />
                                                </td>
                                            </tr>               
                                        );
                                    } else if (user?.status === "rejected") {
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
                                    } else {
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
                                                      +(color === "light" ? "text-blueGray-600" : "text-white")
                                                    }
                                                  >
                                                    {user?.firstName} {user?.lastName}
                                                  </span>
                                                </td>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif tracking-supertight font-bold whitespace-nowrap">
                                                  {user?.email}
                                                </td>
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-xl font-serif font-bold whitespace-nowrap capitalize">
                                                  <i className="fas fa-circle text-green-500 mr-2"></i>{user?.status}
                                                </td>  
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap capitalize">
                                                    <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                                </td>                  
                                                <td className="border-t-0 p-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap text-right">
                                                  <TableDropdown />
                                                </td>
                                            </tr>               
                                        );
                                    };
                                })
                            }
                          </tbody>
                          :
                          <tbody>                    
                              <tr>
                                <td className=""></td>
                                <td className=""></td>
                                <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No record of staff</td>
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
                            {limit} 
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
                  <CardAllApprovedStaffs activeDisplay={activeDisplay} />
                </Suspense>        
                <Suspense fallback={<div>Loading...</div>}>                            
                  <CardAllPendingStaffs activeDisplay={activeDisplay} />
                </Suspense>                       
                <Suspense fallback={<div>Loading...</div>}>
                  <CardAllRejectedStaffs activeDisplay={activeDisplay} />
                </Suspense>
                {/* Views */}

            </div>
        </>
    );
};


CardAllStaffs.defaultProps = {
  color: "light",
};

CardAllStaffs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
