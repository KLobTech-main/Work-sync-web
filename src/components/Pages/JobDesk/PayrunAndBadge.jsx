import React, { useEffect, useState } from "react";
import InnerSidbar from "../../Layout/InnerSidbar";
import Profile from "../../Layout/Profile";
import { Box, Typography, Divider } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function PayrunAndBadge() {
  const [salaryDetails, setSalaryDetails] = useState({
    payRunPeriod: "",
    houseRentAllowance: "",
    conveyanceAllowance: "",
    medicalAllowance: "",
    specialAllowance: "",
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("userData");

    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setSalaryDetails(parsedData.salaryDetails || {});
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <Profile />
      <div className="flex">
        <InnerSidbar />
        <div className="flex-1 p-8 bg-gray-100">
          <Box className="bg-white shadow-md rounded-lg p-8">
            <Typography variant="h5" className="font-semibold mb-6">
              Payrun And Badge
            </Typography>

            {/* Payrun Period */}
            <Box className="flex items-start mb-8">
              <div className="mr-4">
                <AttachMoneyIcon className="text-blue-500 text-3xl" />
              </div>
              <Box>
                <Typography variant="h6" className="font-medium">
                  Payrun Period
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  {salaryDetails.payRunPeriod || "N/A"}
                  <br />
                </Typography>
              </Box>
            </Box>

            <Divider className="mb-8" />

            {/* Allowance */}
            <Box className="flex items-start mb-8">
              <div className="mr-4">
                <AddIcon className="text-green-500 text-3xl" />
              </div>
              <Box>
                <Typography variant="h6" className="font-medium">
                  Allowance
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  House Rent Allowance -{" "}
                  <span className="font-bold">
                    {salaryDetails.houseRentAllowance || "N/A"}
                  </span>
                  <br />
                  Conveyance Allowance -{" "}
                  <span className="font-bold">
                    {salaryDetails.conveyanceAllowance || "N/A"}
                  </span>
                  <br />
                  Medical Allowance -{" "}
                  <span className="font-bold">
                    {salaryDetails.medicalAllowance || "N/A"}
                  </span>
                  <br />
                  Special Allowance -{" "}
                  <span className="font-bold">
                    {salaryDetails.specialAllowance || "N/A"}
                  </span>
                </Typography>
              </Box>
            </Box>

            <Divider className="mb-8" />

            {/* Deduction */}
            <Box className="flex items-start">
              <div className="mr-4">
                <RemoveIcon className="text-red-500 text-3xl" />
              </div>
              <Box>
                <Typography variant="h6" className="font-medium">
                  Deduction
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  (No deductions available)
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default PayrunAndBadge;
