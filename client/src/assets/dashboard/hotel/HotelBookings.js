import React from "react";

import DailyHotelBooking from "./count/DailyHotelBooking";
import MonthlyHotelBooking from "./count/MonthlyHotelBooking";
// import CustomHotelBooking from "./CustomHotelBooking";

import DailyHotelBookingsAmount from "./amount/DailyHotelBookingsAmount";
// import MonthlyHotelBookingsAmount from "./amount/MonthlyHotelBookingsAmount";
// import CustomHotelBookingsAmount from "./amount/CustomHotelBookingsAmount";



const HotelBookings = () => {
    
    
    return ( 
        <>
            {/* <div className="d-flex w-100 px-4">
                <h6 className="bookingTitle fw-bold d-flex px-0 mb-0">Hotel Report</h6>
            </div> */}
            <div className="row justify-content-start m-0 flex-wrap w-100 px-4 column-gap-xl-3 row-gap-xl-4 column-gap-md-4 row-gap-xl-5 row-gap-md-4 row-gap-sm-4">
                <div className="col-12 px-0 pb-sm-4">
                    <DailyHotelBooking />
                </div>
                <div className="col-12 px-0 pb-sm-3">
                    <MonthlyHotelBooking />
                </div>
                {/* <div className="col-12 px-0">
                    <CustomHotelBooking />
                </div> */}
                <div className="col-12 px-0 pb-sm-4">
                    <DailyHotelBookingsAmount />
                </div>
                {/* <div className="col-12 px-0">
                    <MonthlyHotelBookingsAmount />
                </div> */}
                {/* <div className="col-12 px-0">
                    <CustomHotelBookingsAmount />
                </div> */}
            </div>
        </>
    );
}

export default HotelBookings;