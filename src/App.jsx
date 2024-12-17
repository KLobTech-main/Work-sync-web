import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';
import Sidebar from "./components/Layout/Sidebar";
import Navbar from "./components/Layout/Navbar";
import LoginForm from "./components/Forms/LoginForm";
import Dashboard from "./components/Layout/Dashboard";
import RegisterForm from "./components/Forms/RegisterForm";
import JobDesk from "./components/Pages/JobDesk";
import LeaveAllowance from './components/Pages/JobDesk/LeaveAllowance';
import Documents from "./components/Pages/JobDesk/Documents";
import Assets from "./components/Pages/JobDesk/Assets";
import SalaryOverview from "./components/Pages/JobDesk/SalaryOverview";
import PayrunAndBadge from "./components/Pages/JobDesk/PayrunAndBadge";
import PaySlip from "./components/Pages/JobDesk/PaySlip";
import BankDetail from "./components/Pages/JobDesk/BankDetail";
import Address from "./components/Pages/JobDesk/Address";
import Emergency from "./components/Pages/JobDesk/Emergency";
import LeaveRequest from "./components/Pages/Leave/LeaveRequest";
import LeaveSummary from "./components/Pages/Leave/LeaveSummary";
import AttendanceDailyLog from "./components/Pages/Attendance/AttendanceDailyLog";
import AttendanceRequest from "./components/Pages/Attendance/AttendanceRequest";
import AttendanceSummary from "./components/Pages/Attendance/AttendanceSummary";
import Holidays from "./components/Pages/Leave/Holidays";
import JobHistory from "./components/Pages/JobDesk/JobHistory";
import Meetings from "./components/Pages/Meetings";
import Tickets from "./components/Pages/Tickets";
import Task from "./components/Pages/Task";
import PrivateRoute from "./components/PrivateRoute"; 
const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthRoute && <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />}
      <div style={{ display: "flex" }}>
        {!isAuthRoute && <Sidebar />}
        <div style={{ flexGrow: 1, padding: "-1px" }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard darkMode={darkMode} />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk"
              element={
                <PrivateRoute>
                  <JobDesk />
                </PrivateRoute>
              }
            />
            <Route
              path="/meeting"
              element={
                <PrivateRoute>
                  <Meetings darkMode={darkMode} />
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <PrivateRoute>
                  <Tickets />
                </PrivateRoute>
              }
            />
            <Route
              path="/task"
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/leave-allowance"
              element={
                <PrivateRoute>
                  <LeaveAllowance />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/document"
              element={
                <PrivateRoute>
                  <Documents />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/Assets"
              element={
                <PrivateRoute>
                  <Assets />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/jobhistory"
              element={
                <PrivateRoute>
                  <JobHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/salary-overview"
              element={
                <PrivateRoute>
                  <SalaryOverview />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/payrun-and-badge"
              element={
                <PrivateRoute>
                  <PayrunAndBadge />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/payslip"
              element={
                <PrivateRoute>
                  <PaySlip />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/bank-detail"
              element={
                <PrivateRoute>
                  <BankDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/address"
              element={
                <PrivateRoute>
                  <Address />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobdesk/Emergency"
              element={
                <PrivateRoute>
                  <Emergency />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave/request"
              element={
                <PrivateRoute>
                  <LeaveRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave/summary"
              element={
                <PrivateRoute>
                  <LeaveSummary />
                </PrivateRoute>
              }
            />
            <Route
              path="/leave/holidays"
              element={
                <PrivateRoute>
                  <Holidays />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance/daily-log"
              element={
                <PrivateRoute>
                  <AttendanceDailyLog />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance/request"
              element={
                <PrivateRoute>
                  <AttendanceRequest />
                </PrivateRoute>
              }
            />
            <Route
              path="/attendance/summary"
              element={
                <PrivateRoute>
                  <AttendanceSummary />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
