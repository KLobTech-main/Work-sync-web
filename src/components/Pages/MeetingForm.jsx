import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Snackbar,
  IconButton,
} from "@mui/material";
import { AddCircleOutline as AddIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

const MeetingsForm = () => {
  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    attendees: [],
    meetingLink: "",
    meetingMode: "Online",
  });
  const [employees, setEmployees] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("jwtToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const name = userData.name ;

  const usersApiUrl = `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/users/get-all-users-name-email?email=${email}`;

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(usersApiUrl, {
        headers: { Authorization: token },
      });
      if (response.data.status === "success") {
        setEmployees(response.data.users || []);
        setAttendees([email]); 
        console.log(response.data.users);
      } else {
        setError("Failed to fetch employees.");
        setOpenSnackbar(true);
      }
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [email, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMeeting((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAttendeesChange = (event) => {
    const selectedAttendees = event.target.value;

    if (!selectedAttendees.includes(email)) {
      selectedAttendees.push(email); // Ensure current user is included as an attendee
    }

    setAttendees(selectedAttendees);
    setNewMeeting((prevState) => ({
      ...prevState,
      attendees: selectedAttendees,
    }));
  };

  const handleCreateMeeting = async () => {
    const { title, description, date, time, meetingLink, meetingMode } = newMeeting;

    if (!title || !description || !date || !time) {
      setError("All fields are required.");
      setOpenSnackbar(true);
      return;
    }

    const meetingData = {
      name: name , 
      email: email, // Current user's email
      meetingTitle: title,
      description,
      meetingMode,
      participants: attendees,
      duration: "1 hour",
      date,
      scheduledTime: `${date}T${time}:00Z`, // ISO format time with Z for UTC
      status: "Scheduled", // Assuming the meeting is scheduled initially
      meetingLink,
    };

    try {
      await axios.post(
        "https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/meetings",
        meetingData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      setNewMeeting({
        title: "",
        description: "",
        date: "",
        time: "",
        attendees: [],
        meetingLink: "",
        meetingMode: "Online",
      });
      setAttendees([email]);
      setOpenDialog(false);
    } catch (err) {
      setError(err.message);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#ffffff", }}>
     
      <Button
      sx={{minHeight:"55px"}}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenDialog(true)}
      >
        Create Meeting
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create a New Meeting</DialogTitle>
        <DialogContent>
          <TextField
            label="Meeting Title"
            variant="outlined"
            fullWidth
            name="title"
            value={newMeeting.title}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            name="date"
            value={newMeeting.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Time"
            type="time"
            variant="outlined"
            fullWidth
            name="time"
            value={newMeeting.time}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
          <Select
            label="Attendees"
            multiple
            fullWidth
            value={attendees}
            onChange={handleAttendeesChange}
            renderValue={(selected) => selected.join(", ")}
            sx={{ marginBottom: 2 }}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.email} value={employee.email}>
                <Checkbox checked={attendees.indexOf(employee.email) > -1} />
                <ListItemText primary={employee.email} />
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            name="description"
            value={newMeeting.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Meeting Link"
            variant="outlined"
            fullWidth
            name="meetingLink"
            value={newMeeting.meetingLink}
            onChange={handleChange}
            helperText="Optional - Enter a meeting link (Zoom, Google Meet, etc.)"
            sx={{ marginBottom: 2 }}
          />
          <Select
            label="Meeting Mode"
            fullWidth
            name="meetingMode"
            value={newMeeting.meetingMode}
            onChange={handleChange}
          >
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Offline">Offline</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateMeeting} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

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

export default MeetingsForm;
