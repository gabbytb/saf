import React, { useState, useEffect } from "react";
import "react-dates/initialize"; 
import { DateRangePicker } from "react-dates"; 
import "react-dates/lib/css/_datepicker.css";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";      // CategoryScale(X), LinearScale(Y)
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);





function CustomHotelBookingsAmount() {
 
    const [customHotelBookingsAmt, setCustomHotelBookingsAmt] = useState([]);
    

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = loggedInUser ? loggedInUser.accessToken : handleLogout();


    function handleLogout() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location.replace(redirToLogin);
    };

    
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    
    
    useEffect(() => {
        fetchData();
    }, [startDate, endDate]); // Trigger useEffect whenever startDate or endDate changes


    const fetchData = async () => {
        const payload = {
            "mode": "MONTH",
            "startDate": startDate ? startDate.format('YYYY-MM-DD') : null,
            "endDate": endDate ? endDate.format('YYYY-MM-DD') : null
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
                console.log("Custom Period Hotel Response Status: ", success, "\nCustom Period Hotel Response Message: ", message);
            } else {
                setCustomHotelBookingsAmt(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    };


    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };


    useEffect(() => {  
        const payload = {
            "mode": "MONTH",
            "startDate": startDate ? startDate.format('YYYY-MM-DD') : null,
            "endDate": endDate ? endDate.format('YYYY-MM-DD') : null
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
                console.log("Custom Period Hotel Response Status: ", success, 
                            "\nCustom Period Hotel Response Message: ", message);
            } else {
                setCustomHotelBookingsAmt(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    
    }, [token]);
  

    let labels1 = customHotelBookingsAmt?.openBooking?.map((openBookingDataAmt) => openBookingDataAmt.item),
    labels2 = customHotelBookingsAmt?.closedBooking?.map((closedBookingDataAmt) => closedBookingDataAmt.item),
    labels3 = customHotelBookingsAmt?.totalBooking?.map((totalBookingDataAmt) => totalBookingDataAmt.item);
    const customHotelBookingDataAmt = {
        labels: labels1, labels2, labels3,
        datasets: [
            {
                label: "Open Bookings",
                data: customHotelBookingsAmt?.openBooking?.map((openBookingDataAmt) => openBookingDataAmt.amount),
                backgroundColor: "rgb(0 133 35)",
            },
            {
                label: "Closed Bookings",
                data: customHotelBookingsAmt?.closedBooking?.map((closedBookingDataAmt) => closedBookingDataAmt.amount),
                backgroundColor: "rgb(80 37 163)",
            },
            {
                label: "Total Bookings",
                data: customHotelBookingsAmt?.totalBooking?.map((totalBookingDataAmt) => totalBookingDataAmt.amount),
                backgroundColor: "purple",
            }
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                position: 'bottom',
                text: "Custom Period Hotel Booking Bar Chart",
            },
            legend: {
                display: true,        // <-- set display to false to hide the legend
                position: 'bottom',
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        size: 14,
                        style: "normal",
                        weight: "normal",
                        lineHeight: 1.2,
                    }
                }
            },
            tooltip: {
                enabled: true,       // <-- CONTROLS LABEL in DATASETS ==> "On Hover", show/hide info shown on each portion making up the chart.
            },
        },
        scales: {
            x: {            // x-axis is for LABELS
                grid: {
                    drawBorder: false,
                    lineWidth: 0, // <-- this removes horizontal lines across the bars.                    
                }
            },
            y: {            // y-axis is for DATA
                grid: {
                    drawBorder: false,
                    lineWidth: 0, // <-- this removes vertical lines between the bars
                    beginAtZero: true,
                }
            },
        },
        layout: {
            padding: {
                left: 0, // Add left padding to create space around the legend
                right: 0, // Add right padding
                top: 0, // Add top padding
                bottom: 0, // Add bottom padding
            },
        },
    };
    const NairaSymbol = `(₦)`;


    return (
        <div className="d-flex flex-column row-gap-4">
            <div className="d-flex justify-content-start mx-0">
                <div className="col-3 mx-0 mb-0 px-0 h6 fw-bold">Total Bookings {NairaSymbol}/Custom Period</div>
                <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onDatesChange={handleDatesChange}
                    focusedInput={focusedInput}
                    onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    startDateId="your_unique_start_date_id"
                    endDateId="your_unique_end_date_id"
                    displayFormat="DD/MM/YYYY"
                    isOutsideRange={() => false}
                />
            </div>
            <Bar data={customHotelBookingDataAmt} options={options} />
        </div>
    );
};


export default CustomHotelBookingsAmount;