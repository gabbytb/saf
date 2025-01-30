import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);









function PieChart() {
    

    const chartPie = {
        labels: ["Desktop", "Tablet", "Mobile", "Unknow"],
        datasets: [
            {
                label: "No. of Visitors",
                data: [ 30, 18, 34, 18 ],
                backgroundColor: [ "rgba(60, 80, 224, 1)", "rgba(101, 119, 243, 1)", "rgba(128, 202, 238, 1)", "rgba(15, 173, 207, 1)" ],
                borderColor: [ "rgba(60, 80, 224, 1)", "rgba(101, 119, 243, 1)", "rgba(128, 202, 238, 1)", "rgba(15, 173, 207, 1)" ],
                borderWidth: 0,
            }
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                position: 'bottom',     // default values: 'bottom', 'top', 'left', 'right'
                text: "Visitors Web Browsers",
            },
            legend: {         // ===> labels i.e data identifier ==> It is mostly used on the "X-axis" to represent "analytics data" provided in charts e.g Bar chart
                display: true,
                position: 'bottom',
                labels: {       // CONTROLS LABELS in DATASETS
                    boxWidth: 12, // Adjust the box width of each legend item
                    padding: 22,  // Adjust the padding around each legend item
                },
            },
            tooltip: {
                enabled: true,       // <-- CONTROLS LABEL in DATASETS ==> "On Hover", show/hide info shown on each portion making up the chart.
            },
        },
        layout: {
            padding: {
              left: 70, // Add left padding to create space around the legend
              right: 70, // Add right padding
              top: 0, // Add top padding
              bottom: 0, // Add bottom padding
            },
        },
    };


    return (
        <>
            <Pie className="pie-chart" data={chartPie} options={options} /> 
        </>
    );
}


export default PieChart;