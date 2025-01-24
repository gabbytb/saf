import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";      // CategoryScale(X), LinearScale(Y)
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);






const MonthlyHotelBookingsAmount = () => {
    
    const [monthlyHotelBookingsAmt, setMonthlyHotelBookingsAmt] = useState([]);

    
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const token = loggedInUser ? loggedInUser.accessToken : handleLogout();


    function handleLogout() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location.replace(redirToLogin);
    };
    

    useEffect(() => {      
        const payload = {
            "mode":"MONTH",
            "startDate":"2023-01-01",
            "endDate":"2024-03-31"
        }
        const url = "https://api.travelbeta.com/api/v1/hotels/report/booking";
        axios.post(url, payload, {
            headers: { 
                Authorization: `Bearer ${token}`, 
            },
        })
        .then((response) => {
            const { success, data, message } = response.data;
            if (!success) {
                console.log("Monthly Hotel Amount Response Status: ", success, 
                            "\nMonthly Hotel Amount Response Message: ", message);
            } else {
                setMonthlyHotelBookingsAmt(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });

    }, [token]);


    let labels1 = monthlyHotelBookingsAmt?.openBooking?.map((monthlyOpenBookingAmtData) => monthlyOpenBookingAmtData.item),
    labels2 = monthlyHotelBookingsAmt?.closedBooking?.map((monthlyClosedBookingAmtData) => monthlyClosedBookingAmtData.item),
    labels3 = monthlyHotelBookingsAmt?.totalBooking?.map((monthlyTotalBookingAmtData) => monthlyTotalBookingAmtData.item);
    const monthlyHotelBookingDataAmt = {
        labels: labels1, labels2, labels3,
        datasets: [
            {
                label: "Open Bookings",
                data: monthlyHotelBookingsAmt?.openBooking?.map((monthlyOpenBookingAmtData) => Math.floor(monthlyOpenBookingAmtData.amount).toLocaleString),
                backgroundColor: "rgb(0 133 35)",
            },
            {
                label: "Closed Bookings",
                data: monthlyHotelBookingsAmt?.closedBooking?.map((monthlyClosedBookingAmtData) => monthlyClosedBookingAmtData.amount),
                backgroundColor: "rgb(80 37 163)",
            },
            {
                label: "Total Bookings",
                data: monthlyHotelBookingsAmt?.totalBooking?.map((monthlyTotalBookingAmtData) => monthlyTotalBookingAmtData.amount),
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
                text: "Hotel Bookings Bar Chart",
            },
            legend: {
                display: true,        // <-- set display to false to hide the legend
                position: 'bottom',
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        size: 12,
                        style: "normal",
                        weight: "bold",
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
    }
    const NairaSymbol = `(₦)`;
    

    return (
        <div className="d-flex flex-column row-gap-4">
            {/* <h6 className="fw-bold pt-1 mb-4">Bookings/Month</h6> */}
            <div className="row mx-0">
                <div className="mx-0 mb-0 px-0 col-12 h6 fw-bold">Total Bookings {NairaSymbol}/Month</div>
            </div>
            <Bar data={monthlyHotelBookingDataAmt} options={options} />
        </div>
    );
};


export default MonthlyHotelBookingsAmount;