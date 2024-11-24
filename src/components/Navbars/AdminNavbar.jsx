import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserDropdown from "../Dropdowns/UserDropdown.jsx";
import api from "../../api.js";
import CardAllStaffsTable from "../Cards/staffs/CardAllStaffsTable.jsx";










export default function AdminNavbar() {
  
  
    const [data, setData] = useState([]);


    const fetchData = async () => {
        try {
        const response = await api.get(`/api/v1/auth/account/admins`);
        const { success, data, message } = response.data;
        const { staffsList, } = data;

        if (!success && message === "No staff found") {
          console.log("Success: ", success);
          console.log("Message: ", message);
        };

        setData(staffsList);

        localStorage.setItem('data', JSON.stringify(data));
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    
    const [query, setQuery] = useState('');
    const search_parameters = Object.keys(Object.assign({}, ...data));

    function search(data) {
        return data?.filter((item) =>
            search_parameters.some((parameter) =>
              item[parameter]?.toString()?.toLowerCase()?.includes(query)
        ));
    };




    return (
        <>
          {/* Navbar */}
          <nav className="absolute top-0 left-0 w-full z-1 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
              <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                
                {/* Brand */}
                <Link
                  className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
                  to="/admin/dashboard"
                  onClick={(e) => e.preventDefault()}
                >
                  Dashboard
                </Link>

                {/* Form*/}
                <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-12">
                    <div className="relative flex w-full flex-wrap items-stretch">                      
                        <span className="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-2xl flex items-center justify-center w-12 pl-3 py-3">
                            <i className="fas fa-search"></i>
                        </span>
                            
                        <input
                            type="search"
                                name="q"
                                id="search-form"
                                className="search-input border-0 px-3 py-3 indent-8 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"       
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search user"
                        />

                        <button type="submit" onSubmit={fetchData}></button>
                    </div>

                     <CardAllStaffsTable search={search} allStaffs={data} />                     
                </form>
      
                {/* User */}
                <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                  <UserDropdown />
                </ul>

              </div>
          </nav>
          {/* End Navbar */}       
          
        </>
    );
};
