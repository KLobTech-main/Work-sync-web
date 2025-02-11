import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
} from "@mui/material";

function AboutProject() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      name: "Work Sync",
      goal: "To enhance employee productivity and streamline work management.",
      objective:
        "Provide a seamless platform for employees to manage attendance, leaves, and tickets.",
      techStack: "React, Node.js, Material UI, Vite, Tailwind CSS",
      teamMembers: [
        { name: "Hemant", language: " React" },
        { name: "Ishan", language: "Node.js" },
        { name: "Hemant", language: "Material UI" },
      ],
      deadline: "2025-03-15",
      clientName: "KLobTech",
      projectLead: "Ishan",
    },
    {
      name: "Parking Solution",
      goal: "Optimize parking space management for better vehicle organization.",
      objective:
        "Enable guards and vehicle owners to efficiently handle parking slots.",
      techStack: "React.js, Firebase, Tailwind CSS",
      teamMembers: [
        { name: "Hemant Soni", language: "React.js" },
        { name: "Lakhan", language: "Firebase , Tailwind CSS" },
      ],
      deadline: "2025-02-28",
      clientName: "Ethreal Softech",
      projectLead: "Hemant Soni",
    },
  ];

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <Box sx={{ padding: 4,minHeight:"100vh", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Projects
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(project)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.goal}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedProject && (
        <Dialog open={Boolean(selectedProject)} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedProject.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              <strong>Goal:</strong> {selectedProject.goal}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Objective:</strong> {selectedProject.objective}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tech Stack:</strong> {selectedProject.techStack}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Team Members:</strong>
            </Typography>
            <ul>
              {selectedProject.teamMembers.map((member, idx) => (
                <li key={idx}>
                  {member.name} - {member.language}
                </li>
              ))}
            </ul>
            <Typography variant="body1" gutterBottom>
              <strong>Deadline:</strong> {selectedProject.deadline}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Client Name:</strong> {selectedProject.clientName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Project Lead:</strong> {selectedProject.projectLead}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}

export default AboutProject;

