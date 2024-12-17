import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InnerSidbar from '../../Layout/InnerSidbar';
import Profile from '../../Layout/Profile';
function SalaryOverview() {
  return (
    <>

    <Profile />
      <div className="flex">
        <InnerSidbar />
    <div className="flex flex-col items-start w-full p-4 bg-gray-100">
      <Typography variant="h6" className="mb-4 font-semibold text-gray-800">
        Salary Overview
      </Typography>

      <Paper elevation={1} className="w-full p-4 rounded-lg">
        <div className="flex items-center">
          <Box
            className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full"
            aria-label="Salary Icon"
          >
            <AttachMoneyIcon className="text-blue-500" />
          </Box>

          <div className="ml-4">
            <Typography variant="body1" className="text-gray-600">
              Salary
            </Typography>
            <Typography
              variant="body2"
              className="mt-1 font-medium text-gray-500 bg-gray-50 rounded px-2 py-1"
            >
              Not added yet
            </Typography>
          </div>
        </div>
      </Paper>
        
    </div>
        </div>
    </>
  );
}

export default SalaryOverview;
