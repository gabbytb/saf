import React from 'react'
import { Link, } from "react-router-dom";
import sketch from '../../../assets/img/sketch.jpg';
import { TableDropdown } from '../..';





const CardAllStaffsTable = ({ color, search, allStaffs, }) => {
   
    return (
        <>
            {search(allStaffs)?.map((user, userIndex) => {
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
            })}
        </>
    );
};

export default CardAllStaffsTable