import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { format, parseISO } from "date-fns";
import SummaryData from "./SummaryComponent/SummaryData";
import SummaryChart from "./SummaryComponent/SummaryChart";

function Summary() {
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email") || "ishan@gmail.com";
    const token = localStorage.getItem("jwtToken");

    if (email && token) {
      axios
        .get(
          `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/attendance/${email}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching summary data:", error);
        });
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(parseISO(dateString), "dd-MM-yyyy"); 
    } catch {
      return "Invalid Date";
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    try {
      return format(parseISO(timeString), "hh:mma");
    } catch {
      return "Invalid Time";
    }
  };

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#f9fafb",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "16px" }}>
        Attendance Summary
      </Typography>
      <div className="flex flex-row ">
        <SummaryChart />
        <SummaryData />
      </div>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Punched In</TableCell>
                <TableCell>Punched Out</TableCell>
                <TableCell>Total Working Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryData.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>{formatTime(row.punchInTime)}</TableCell>
                  <TableCell>{formatTime(row.punchOutTime)}</TableCell>
                  <TableCell>{row.totalWorkingHours || "0:00:00"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Summary;
