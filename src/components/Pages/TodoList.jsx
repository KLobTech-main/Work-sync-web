import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('low');
  const [openDialog, setOpenDialog] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterCompleted, setFilterCompleted] = useState('');

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: priority,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setPriority('low');
      setOpenDialog(false);
    }
  };

  const startEditing = (task) => {
    setEditTaskId(task.id);
    setEditTaskText(task.text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editTaskText } : task
      )
    );
    setEditTaskId(null);
    setEditTaskText('');
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleFilterPriorityChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const handleFilterCompletedChange = (event) => {
    setFilterCompleted(event.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    let priorityMatch = true;
    let completedMatch = true;

    if (filterPriority) {
      priorityMatch = task.priority === filterPriority;
    }

    if (filterCompleted !== '') {
      completedMatch = task.completed === (filterCompleted === 'completed');
    }

    return priorityMatch && completedMatch;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div className="w-full  p-3 mx-auto mt-10">

      {/* Filter Section */}
      <div className="mb-4 flex space-x-2  justify-between">
      <h2 className="text-2xl font-semibold text-center mb-4">Advanced To-Do List</h2>
        <div className='flex gap-2' >

        <FormControl className="w-32">
          <InputLabel>Priority</InputLabel>
          <Select
            value={filterPriority}
            onChange={handleFilterPriorityChange}
            label="Priority"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        <FormControl className="w-32">
          <InputLabel>Completed</InputLabel>
          <Select
            value={filterCompleted}
            onChange={handleFilterCompletedChange}
            label="Completed"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="active">Active</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Todo
        </Button>
        </div>
      </div>

      {/* Table Section */}

      <TableContainer className="mb-4 ">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.text}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded ${getPriorityColor(task.priority)} text-white`}
                  >
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Typography
                    className={`${task.completed ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {task.completed ? 'Completed' : 'Active'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => toggleCompletion(task.id)}
                    color="primary"
                    
                    sx={{  fontSize: 16 }}
                    aria-label="toggle-completion"
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </IconButton>

                  <IconButton
                    onClick={() => removeTask(task.id)}
                    color="secondary"
                    aria-label="remove"
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => startEditing(task)}
                    color="warning"
                    aria-label="edit"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Adding Todo */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={handlePriorityChange}
              label="Priority"
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={addTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;
