import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";





const DailyHotelBookingAmount = () => {
    
    const [dailyHotelBookingsAmt, setDailyHotelBookingsAmt] = useState([]);
    
    
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
                console.log("Daily Hotel Bookings Amount Response Status: ", success, "\nDaily Hotel Bookings Amount Response Message: ", message);
            } else {
                setDailyHotelBookingsAmt(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    }, [token]);    
    const NairaSymbol = `(₦)`;


    
    return (
        <div className="d-flex flex-column row-gap-3">
            <div className="row mx-0">
                <div className="mx-0 mb-0 px-0 col-12 h6 fw-bold">Total Bookings {NairaSymbol}/Day</div>
            </div>
            <div className="row flex-wrap mx-0 column-gap-4 column-gap-xl-4 px-0 row-gap-3">
                <ul className="col w-100 mx-0 px-2 py-5 list-unstyled mb-0 d-flex flex-column justify-content-between custom-total bg-info shadow rounded row-gap-2 text-white">
                    {
                        dailyHotelBookingsAmt?.totalBooking?.map((totalBookingAmt, index) => {
                            if (index === 0) {
                                return (
                                    <li key={index} className="d-flex mb-0 w-100 flex-column row-gap-3 text-center">
                                        <div className="d-flex flex-column h5 mb-0">Total Bookings</div>
                                        <Link className="d-flex text-decoration-none justify-content-center text-white fw-bold fs-4" to={""} alt="total booking">₦ {Math.floor(totalBookingAmt.amount).toLocaleString()}</Link>
                                    </li>
                                )
                            }
                            return null;
                        })
                    }
                </ul>
                <ul className="col w-100 mx-0 px-2 py-5 list-unstyled mb-0 d-flex flex-column justify-content-between custom-close bg-primary shadow rounded row-gap-2 text-white">
                    {
                        dailyHotelBookingsAmt?.closedBooking?.map((closedBookingAmt, index) => {
                            if (index === 0) {
                                return (
                                    <li key={index} className="d-flex mb-0 w-100 flex-column row-gap-3 text-center">
                                        <div className="d-flex flex-column h5 mb-0">Closed Bookings</div>
                                        <Link className="d-flex text-decoration-none justify-content-center text-white fw-bold fs-4" to={""} alt="closed booking">₦ {Math.floor(closedBookingAmt.amount).toLocaleString()}</Link>
                                    </li>
                                )      
                            }
                            return null;
                        })
                    }
                </ul>
            </div>
        </div>
    );
};


export default DailyHotelBookingAmount;
