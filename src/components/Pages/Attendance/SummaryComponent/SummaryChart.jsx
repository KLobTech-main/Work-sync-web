import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryChart() {
  const [chartData, setChartData] = useState({
    labels: ["Break Minutes", "Worked Hours", "Overtime Minutes", "Late Minutes"],
    datasets: [
      {
        data: [40, 0, 0, 0],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#9C27B0"],
        hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#EF5350", "#AB47BC"],
      },
    ],
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("jwtToken");

    if (email && token) {
      const currentDate = new Date();
      const previousYear = currentDate.getFullYear();
      let previousMonth, year;

      if (currentDate.getMonth() === 0) {
        // January
        previousMonth = 12;
        year = previousYear - 1;
      } else {
        previousMonth = currentDate.getMonth();
        year = previousYear;
      }
      const apiUrl = `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/attendance/monthly/${email}/${year}/${previousMonth}`;

      fetch(apiUrl, {
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          const responseBody = data.body;
          setChartData({
            labels: [
              "Break Minutes",
              "Worked Hours",
              "Overtime Minutes",
              "Late Minutes",
            ],
            datasets: [
              {
                data: [
                  responseBody.totalBreakMinutes || 0,
                  responseBody.totalWorkedHours || 0,
                  responseBody.totalOvertimeMinutes || 0,
                  responseBody.totalLateMinutes || 0,
                ],
                backgroundColor: ["#4CAF50", "#FF9800", "#F44336", "#9C27B0"],
                hoverBackgroundColor: [
                  "#66BB6A",
                  "#FFB74D",
                  "#EF5350",
                  "#AB47BC",
                ],
              },
            ],
          });
        })
        .catch((error) => console.error("Error fetching summary data:", error));
    }
  }, []);

  return (
    <div
      style={{
        padding: "16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: "24px",
          borderRadius: "12px",
          width: "600px",
          height:"400px",
          backgroundColor: "#ffffff",
        }}
      >
      
        <Doughnut data={chartData} />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            marginTop: "24px",
          }}
        >
          {chartData.labels.map((label, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                margin: "8px 16px",
              }}
            >
              <Typography
                style={{
                  color: chartData.datasets[0].backgroundColor[index],
                  fontWeight: "bold",
                }}
              >
                
                {label}
              </Typography>
              <Typography>
                {chartData.datasets[0].data[index]}{" "}
                {label === "Worked Hours" ? "Hours" : "Minutes"}
              </Typography>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}

export default SummaryChart;
