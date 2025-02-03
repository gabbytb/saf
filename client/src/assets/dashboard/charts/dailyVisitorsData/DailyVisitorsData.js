import React, { useEffect, useState } from "react";
import axios from "axios";




export default function DailyVisitorsData() {

    const [dailyUniqueVisitorsData, setDailyUniqueVistorsData] = useState(null);
    const [dailyPageViewsData, setDailyPageViewsData] = useState(null);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = loggedInUser ? loggedInUser.accessToken : handleLogout();


    function handleLogout() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location.replace(redirToLogin);
    };
    

    useEffect(() => {
        const payload = {
            "mode": "DAY",
            "startDate": "2024-03-01",
            "endDate": "2024-03-31"
        };
        const url = "https://api.travelbeta.com/api/v1/auth/statistics/visitors";
        axios.post(url, payload, {
            headers: { 
                Authorization: `Bearer ${token}`, 
            },
        })
        .then((response) => {
            const { success, data, message } = response.data;
            if (!success) {
                console.log("Response Status: ", success);
                console.log("Response Message: ", message);
            } else {
                setDailyUniqueVistorsData(data.uniqueVisitors);
                setDailyPageViewsData(data.pageViews);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    }, [token]);


    return(
        <>
            <div className="container px-0">
                <div className="d-flex justify-content-center py-3">
                    <div className="col-12 d-flex px-0 column-gap-4 px-4 row-gap-3">
                        <div className="col w-100 mx-0 px-2 py-4 list-unstyled mb-0 d-flex flex-column justify-content-between bg-success shadow rounded row-gap-2 text-white">
                            <div className="h5 d-flex justify-content-center mb-0">{dailyPageViewsData}</div>
                            <div className="h6 d-flex justify-content-center mb-0">Page Views</div>
                        </div>
                        <div className="col w-100 mx-0 px-2 py-4 list-unstyled mb-0 d-flex flex-column justify-content-between bg-success shadow rounded row-gap-2 text-white">
                            <div className="h5 d-flex justify-content-center mb-0">{dailyUniqueVisitorsData}</div>
                            <div className="h6 d-flex justify-content-center mb-0">Unique Visitors</div>
                        </div>
                    </div>
                    {/* <div className="col-5 row px-0 mx-0 justify-content-between">
                        
                            <div className="col-5 px-0 d-flex flex-column bg-white rounded shadow px-4 py-3 row-gap-3 align-items-center">
                                <div className="h5 d-flex justify-content-center mb-0">{pageViewsData}</div>
                                <div className="h6">Page Views</div>
                            </div>
                            <div className="col-5 px-0 d-flex flex-column bg-white rounded shadow px-4 py-3 row-gap-3 align-items-center">
                                <div className="h5 d-flex justify-content-center mb-0">{uniqueVisitorsData}</div>
                                <div className="h6">Unique Visitors</div>
                            </div>
                        
                    </div>
                    <div className="col-5 row px-0 mx-0 justify-content-between">
                            <div className="col-5 px-0 d-flex flex-column bg-white rounded shadow px-4 py-3 row-gap-3 align-items-center">
                                <div className="h5 d-flex justify-content-center mb-0">{pageViewsData}</div>
                                <div className="h6">Bounce Rate</div>
                            </div>
                            <div className="col-5 px-0 d-flex flex-column bg-white rounded shadow px-4 py-3 row-gap-3 align-items-center">
                                <div className="h5 d-flex justify-content-center mb-0">{uniqueVisitorsData}</div>
                                <div className="h6">Visit Duration</div>
                            </div>
                    </div> */}
                </div>
            </div>      
        </>
    )
}