import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  TableCell,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';

const Task = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (filter) {
      const filtered = allTasks.filter((task) =>
        task.status.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(allTasks);
    }
  }, [filter, allTasks]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const assignedToResponse = await axios.get(
        `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/tasks/get-given-tasks`,
        { headers: { Authorization: token }, params: { assignedTo: email } }
      );

      const assignedToTasks = assignedToResponse.data.map((task) => ({
        ...task,
        type: 'Assigned To Me',
      }));
      setAllTasks(assignedToTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err.response || err.message);
      setError('Failed to fetch tasks. Please try again later.');
      setSnackbarMessage('Failed to fetch tasks. Please try again later.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.patch(
        `https://work-sync-gbf0h9d5amcxhwcr.canadacentral-01.azurewebsites.net/api/tasks/status`,
        null,
        {
          headers: { Authorization: token },
          params: {
            taskId,
            email,
            status: newStatus,
          },
        }
      );
      setSnackbarMessage(`Task status updated to ${newStatus}`);
      setSnackbarOpen(true);

      // Update the task locally
      setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error('Error updating task status:', err.response || err.message);
      setSnackbarMessage('Failed to update task status. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleRowClick = (task) => {
    const titleWords = task.title.split(' ').length;
    const descriptionWords = task.description.split(' ').length;

    if (titleWords > 5 || descriptionWords > 5) {
      setSelectedTask(task);
    }
  };

  const handleCloseDialog = () => {
    setSelectedTask(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'orange', fontWeight: 'bold' };
      case 'On Going':
        return { color: 'blue', fontWeight: 'bold' };
      case 'On Hold':
        return { color: 'purple', fontWeight: 'bold' };
      case 'Completed':
        return { color: 'green', fontWeight: 'bold' };
      case 'Blocked':
        return { color: 'red', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Task Management
      </Typography>

      {error && (
        <Typography color="error" sx={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Filter */}
      <FormControl fullWidth sx={{ marginBottom: '20px' }}>
        <InputLabel id="filter-label">Filter by Status</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          onChange={handleFilterChange}
          label="Filter by Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="On Going">On Going</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Blocked">Blocked</MenuItem>
          <MenuItem value="On Hold">On Hold</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" sx={{ marginBottom: '20px' }}>
        All Tasks
      </Typography>
      <TaskTable
        tasks={filteredTasks}
        loading={loading}
        onRowClick={handleRowClick}
        onStatusChange={handleStatusChange}
        getStatusStyle={getStatusStyle}
      />

      {/* Dialog */}
      <Dialog open={!!selectedTask} onClose={handleCloseDialog}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <Box>
              <Typography><strong>Title:</strong> {selectedTask.title}</Typography>
              <Typography><strong>Description:</strong> {selectedTask.description}</Typography>
              <Typography><strong>Assigned To:</strong> {selectedTask.assignedTo}</Typography>
              <Typography><strong>Assigned By:</strong> {selectedTask.assignedBy}</Typography>
              <Typography><strong>Deadline:</strong> {selectedTask.deadLine || 'N/A'}</Typography>
              <Typography><strong>Status:</strong> {selectedTask.status}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const TaskTable = ({ tasks, loading, onRowClick, onStatusChange, getStatusStyle }) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', margin: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (tasks.length === 0) {
    return <Typography>No tasks found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Assigned By</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              onClick={() => onRowClick(task)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description }</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.assignedBy}</TableCell>
              <TableCell>{task.deadLine || 'N/A'}</TableCell>
              <TableCell>
                <Select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                  sx={getStatusStyle(task.status)}
                >
                  <MenuItem value="Pending" style={getStatusStyle('Pending')}>
                    Pending
                  </MenuItem>
                  <MenuItem value="On Going" style={getStatusStyle('On Going')}>
                    On Going
                  </MenuItem>
                  <MenuItem value="On Hold" style={getStatusStyle('On Hold')}>
                    On Hold
                  </MenuItem>
                  <MenuItem value="Completed" style={getStatusStyle('Completed')}>
                    Completed
                  </MenuItem>
                  <MenuItem value="Blocked" style={getStatusStyle('Blocked')}>
                    Blocked
                  </MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Task;
