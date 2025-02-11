import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Snackbar,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MeetingsForm from "./MeetingForm";
import { Height } from "@mui/icons-material";

const Meetings = () => {
  const [hostMeetings, setHostMeetings] = useState([]);
  const [participantMeetings, setParticipantMeetings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [titleFilter, setTitleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");

  const apiBaseUrl =
    "https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/meetings";

  const fetchMeetings = async () => {
    if (!email || !token) {
      setError("Authentication information is missing.");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    try {
      const hostResponse = await axios.get(`${apiBaseUrl}`, {
        headers: { Authorization: token },
      });
      setHostMeetings(hostResponse.data);

      const participantResponse = await axios.get(
        `${apiBaseUrl}/participant`,
        {
          params: { participant: email },
          headers: { Authorization: token },
        }
      );
      setParticipantMeetings(participantResponse.data);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [email, token]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleResetFilters = () => {
    setTitleFilter("");
    setDateFilter("");
  };

  const filteredParticipantMeetings = participantMeetings.filter(
    (meeting) =>
      (!titleFilter || meeting.meetingTitle?.toLowerCase().includes(titleFilter.toLowerCase())) &&
      (!dateFilter || meeting.date === dateFilter)
  );

  const filteredHostMeetings = hostMeetings.filter(
    (meeting) =>
      (!titleFilter || meeting.meetingTitle?.toLowerCase().includes(titleFilter.toLowerCase())) &&
      (!dateFilter || meeting.date === dateFilter)
  );

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
        Loading meetings...
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#ffffff" }}>
      <div className="flex justify-between">


        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Meetings
        </Typography>

      <Box sx={{ display: "flex",alignItems:"center",  gap: "10px",  marginBottom: "20px" }}>
<MeetingsForm/>
        <TextField
          label="Search by Title"
          variant="outlined"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />
        
        <TextField
          label="Filter by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
    
        <Button variant="outlined" sx={{minHeight:"55px"}} onClick={handleResetFilters}>
          Reset
        </Button>

      </Box>
      
      </div>
      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Meetings You Are Attending
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Meeting Link</TableCell>
              <TableCell>Mode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredParticipantMeetings.length > 0 ? (
              filteredParticipantMeetings.map((meeting, index) => (
                <TableRow key={index}>
                  <TableCell>{meeting.meetingTitle || "Untitled"}</TableCell>
                  <TableCell>{meeting.date || "N/A"}</TableCell>
                  <TableCell>{
                    new Date(meeting.scheduledTime || "").toLocaleTimeString()
                  }</TableCell>
                  <TableCell>{meeting.description || "No description"}</TableCell>
                  <TableCell>{
                    meeting.participants
                      ? meeting.participants.join(", ")
                      : "No attendees"
                  }</TableCell>
                  <TableCell>
                    {meeting.meetingLink ? (
                      <Link
                        href={meeting.meetingLink}
                        target="_blank"
                        color="primary"
                      >
                        Join Meeting
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>{meeting.meetingMode || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No participant meetings available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        All Meetings
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "30px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Attendees</TableCell>
              <TableCell>Mode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHostMeetings.length > 0 ? (
              filteredHostMeetings.map((meeting, index) => (
                <TableRow key={index}>
                  <TableCell>{meeting.meetingTitle || "Untitled"}</TableCell>
                  <TableCell>{meeting.date || "N/A"}</TableCell>
                  <TableCell>{
                    new Date(meeting.scheduledTime || "").toLocaleTimeString()
                  }</TableCell>
                  <TableCell>{
                    meeting.participants
                      ? meeting.participants.join(", ")
                      : "No attendees"
                  }</TableCell>
                  <TableCell>{meeting.meetingMode || "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No hosted meetings available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      
    </Box>
  );
};

export default Meetings;
