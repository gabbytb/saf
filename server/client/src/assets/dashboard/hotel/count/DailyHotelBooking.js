import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";





const DailyHotelBooking = () => {
    
    const [dailyHotelBookings, setDailyHotelBookings] = useState([]);
        
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = loggedInUser ? loggedInUser.accessToken : handleLogout();


    function handleLogout() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    };
    

    useEffect(() => {
        const payload = {
            "mode": "DAY",
            "startDate": "2024-03-18",
            "endDate": "2024-03-18"
        };
        const url = "https://api.travelbeta.com/api/v1/hotels/report/booking";
        axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        })
        .then((response) => {
            const { success, data, message } = response.data;

            if (!success) {
                console.log("Daily Hotel Bookings: ", success);
                console.log("Daily Hotel Bookings: ", message);
            } else {
                // console.log("Daily Hotel Bookings: ", data);
                setDailyHotelBookings(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    }, [token]);


    return (
        <div className="d-flex flex-column row-gap-3">
            <div className="row mx-0">
                <div className="mx-0 mb-0 px-0 col-12 h6 fw-bold">Bookings</div>
            </div>
            <div className="row flex-wrap mx-0 column-gap-4 px-0 row-gap-3">
                <div className="col-5 col-xl-3 col-md-5 mx-0 px-3 py-3 list-unstyled custom-open mb-0 d-flex flex-column justify-content-between custom-open bg-danger shadow rounded row-gap-3 col-sm-5">
                    {
                        dailyHotelBookings?.openBooking?.map((dailyOpenBookingData, index) => {
                            if (index === 0) {
                                return (
                                    <li key={index} className="px-0"><p className="d-flex flex-column justify-content-between text-white mb-0 row-gap-2 fw-bold">Open Booking <Link to={""} className="text-white fw-normal">{dailyOpenBookingData.count}</Link></p></li>
                                )
                            }
                            return null;
                        })
                    }
                </div>
                <div className="col-5 col-xl-3 col-md-5 mx-0 px-3 py-3 list-unstyled custom-closed mb-0 d-flex flex-column justify-content-between custom-close bg-primary shadow rounded row-gap-3 col-sm-5">
                    {
                        dailyHotelBookings?.closedBooking?.map((dailyClosedBookingData, index) => {
                            if (index === 0) {
                                return (
                                    <li key={index} className="px-0"><p className="d-flex flex-column justify-content-between text-white mb-0 row-gap-2 fw-bold">Closed Booking <Link to={""} className="text-white fw-normal">{dailyClosedBookingData.count}</Link></p></li>
                                ) 
                            }
                            return null;
                        })
                    }
                </div>
                <div className="col-5 col-xl-4 col-md-5 mx-0 px-3 py-3 list-unstyled custom-total mb-0 d-flex flex-column justify-content-between custom-total bg-info shadow rounded row-gap-3 col-sm-5">
                    {
                        dailyHotelBookings?.totalBooking?.map((dailyTotalBookingData, index) => {
                            // Check if index is 1
                            if (index === 1) {
                                // If index is 1, display the element at index 1
                                return (
                                    <div key={index} className="d-flex flex-column justify-content-between text-white mb-0 row-gap-2 fw-bold">Total Booking 
                                      <Link to={""} className="text-white fw-normal">{dailyTotalBookingData.count}</Link>
                                    </div>
                                );
                            } else if (index === 0) {
                                // If index is 0, display the element at index 0 only if index 1 is not available
                                if (!dailyHotelBookings?.totalBooking[1]) {
                                    return (
                                        <div key={index} className="d-flex flex-column justify-content-between text-white mb-0 row-gap-2 fw-bold">Total Booking 
                                            <Link to={""} className="text-white fw-normal">{dailyTotalBookingData.count}</Link>
                                        </div>
                                   );
                                } else {
                                    // If index 1 is available, don't display index 0
                                    return null;
                                }
                            }

                            // If index is neither 0 nor 1, return null
                            return null;
                        })
                    }
                </div>
            </div>
        </div>
    );
};


export default DailyHotelBooking;
