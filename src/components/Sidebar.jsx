import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  People as EmployeeIcon,
  Person as SubAdminIcon,
  MeetingRoom as MeetingIcon,
  CheckCircle as TaskIcon,
  ConfirmationNumber as TicketIcon,
  Announcement as AnnouncementIcon,
  HolidayVillage as LeaveIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/admin/login');
  };

  return (
    <div
      style={{
        width: 240,
        backgroundColor: '#0D1B2A',
        color: '#E0F2F1',
        height: '100vh',
        paddingTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <div style={{ textAlign: 'center', padding: '16px' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#1E3A8A',
            }}
          >
            Work Sync
          </Typography>
        </div>
        <List>
          {/* Employee Detail */}
          <ListItem button component={NavLink} to="/admin/employee-details">
            <ListItemIcon>
              <EmployeeIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Employee Detail" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Sub Admin Detail */}
          <ListItem button component={NavLink} to="/admin/subadmin-details">
            <ListItemIcon>
              <SubAdminIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Sub Admin Detail" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Leave Request */}
          <ListItem button component={NavLink} to="/admin/leave-request">
            <ListItemIcon>
              <LeaveIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Leave Request" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Meeting */}
          <ListItem button component={NavLink} to="/admin/meetings">
            <ListItemIcon>
              <MeetingIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Meeting" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Task */}
          <ListItem button component={NavLink} to="/admin/tasks">
            <ListItemIcon>
              <TaskIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Task" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Ticket */}
          <ListItem button component={NavLink} to="/admin/tickets">
            <ListItemIcon>
              <TicketIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Ticket" sx={{ color: '#E0F2F1' }} />
          </ListItem>

          {/* Announcement */}
          <ListItem button component={NavLink} to="/admin/announcement">
            <ListItemIcon>
              <AnnouncementIcon sx={{ color: '#1E3A8A' }} />
            </ListItemIcon>
            <ListItemText primary="Announcement" sx={{ color: '#E0F2F1' }} />
          </ListItem>
        </List>
      </Box>
      <Box sx={{ padding: 2, textAlign: 'center' }}>
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            backgroundColor: '#1E3A8A',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#2d3b48',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;
