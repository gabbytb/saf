import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";      // CategoryScale(X), LinearScale(Y)
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);






const DailyVisitorsAnalytics = () => {
    
    const [dailyVisitorsAnalyticsData, setDailyVisitorsAnalyticsData] = useState([]);

    
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
        // console.log("Daily Data of Visitors/Month", payload);
        axios.post("https://api.travelbeta.com/api/v1/auth/statistics/visitors", payload,
        {
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
                setDailyVisitorsAnalyticsData(data);
            };
        })
        .catch((error) => {
            console.log("error", error);
        });
    }, [token]);


    const dailyVisitorsDataAnalysis = {
        labels: dailyVisitorsAnalyticsData?.analytics?.map((dailyVisitorsData) => dailyVisitorsData.item),
        datasets: [
            {
                label: "No. of Visitors",
                data: dailyVisitorsAnalyticsData?.analytics?.map((dailyVisitorsData) => dailyVisitorsData.count),
                backgroundColor: "rgba(60,80,224,1)",
            },
        ],
    };


    
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                position: 'bottom',
                text: "Analytics Bar Chart",
            },
            legend: {
                display: false,        // <-- set display to false to hide the legend
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

 

    return (
        <div className="d-flex flex-column row-gap-5 px-4 py-4">
            <div className="col">
                <h6 className="fw-bold pt-1 mb-4">Visitor's Analytics/Month</h6>
                <Bar className="bar-chart" data={dailyVisitorsDataAnalysis} options={options} />
            </div>
        </div>
    );
};



export default DailyVisitorsAnalytics;