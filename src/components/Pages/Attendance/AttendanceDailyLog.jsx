import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/lab';

const DailyLog = () => {
  const [logData, setLogData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email');
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/attendance/${email}`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setLogData(data.logs || []); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = logData.filter(
    (log) =>
      log.profile === loggedInUser &&
      log.date === selectedDate.toISOString().split('T')[0] &&
      log.profile.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box className="p-8 bg-gray-50 min-h-screen">
      <Grid container spacing={2} className="mb-6">
        <Grid item xs={12} sm={8}>
          <Box className="flex space-x-4">
            {['Today', 'Behavior', 'Type'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleFilterChange(filter)}
              >
                {filter}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} className="mb-6">
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" className="font-bold">
            Select Date:
          </Typography>
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(props) => <TextField {...props} fullWidth />}
          />
        </Grid>
      </Grid>

      {error && (
        <Typography color="error" className="mb-4">
          {error}
        </Typography>
      )}

      <Paper className="p-6 shadow-md mb-6">
        <Typography variant="h6" className="font-bold mb-4">
          Daily Logs
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              {[
                'Profile',
                'Date',
                'Punch In',
                'In GeoLocation',
                'Punch Out',
                'Out GeoLocation',
                'Behavior',
                'Type',
                'Break Time',
                'Total Hours',
                'Entry',
              ].map((heading) => (
                <TableCell key={heading} className="font-bold text-gray-600">
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.profile}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.punchIn}</TableCell>
                  <TableCell>{log.inGeoLocation}</TableCell>
                  <TableCell>{log.punchOut}</TableCell>
                  <TableCell>{log.outGeoLocation}</TableCell>
                  <TableCell>{log.behavior}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.breakTime}</TableCell>
                  <TableCell>{log.totalHours}</TableCell>
                  <TableCell>{log.entry}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default DailyLog;