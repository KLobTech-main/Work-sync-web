import React, { useEffect, useState } from "react";
import { Typography, Paper, Grid, Divider, CircularProgress } from "@mui/material";

function SummaryData() {
  const [summaryData, setSummaryData] = useState({});
  const [loading, setLoading] = useState(true);

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

      fetch(
        `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/attendance/monthly/${email}/${year}/${previousMonth}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setSummaryData(data.body || {});
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching summary data:", error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", backgroundColor: "#f9fafb" }}>
      <Paper elevation={3} style={{ padding: "16px", borderRadius: "8px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              style={{
                padding: "16px",
                backgroundColor: "#e3f2fd",
                borderRadius: "8px",
                display:"felx",
                flexFlow:"column",
              }}
            >
              <Typography variant="h6" color="primary">
                Total Break Minutes
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {summaryData.totalBreakMinutes || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              style={{
                padding: "16px",
                backgroundColor: "#e8f5e9",
                borderRadius: "8px",
                display:"felx",
                flexFlow:"column",
              }}
            >
              <Typography variant="h6" color="secondary">
                Total Worked Hours
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {summaryData.totalWorkedHours || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              style={{
                padding: "16px",
                backgroundColor: "#fbe9e7",
                borderRadius: "8px",
                display:"felx",
                flexFlow:"column",
              }}
            >
              <Typography variant="h6" color="error">
                Total Overtime Minutes
              </Typography>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {summaryData.totalOvertimeMinutes || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={1}
              style={{
                padding: "16px",
                backgroundColor: "#ede7f6",
                borderRadius: "8px",
                display:"felx",
                flexFlow:"column",
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Total Late Minutes
              </Typography>
              
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {summaryData.totalLateMinutes || 0}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider style={{ margin: "24px 0" }} />

        </Paper>
    </div>
  );
}

export default SummaryData;
