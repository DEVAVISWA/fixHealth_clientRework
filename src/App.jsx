import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ROUTES from "./config/routes";
import Dashboard from "./layout/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BackDrop from "./components/BackDrop";
import MessageBar from "./components/MessageBar";

const App = () => {
  const { isAuthenticated, user_type } = useSelector((state) => state.user);
  const { active } = useSelector((state) => state.backdrop);
  return (
    <div className="app">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route
            path={ROUTES.dashboard}
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate replace to={ROUTES.login} />
              )
            }
          />
          <Route
            path={ROUTES.login}
            element={
              isAuthenticated ? (
                <Navigate replace to={ROUTES.home + user_type} />
              ) : (
                <Login />
              )
            }
          />
          <Route path={ROUTES.signin} element={<Signup />} />
          <Route
            path="/*"
            element={
              <Navigate
                replace
                to={isAuthenticated ? ROUTES.home + user_type : ROUTES.login}
              />
            }
          />
        </Routes>
        <BackDrop active={active} />
        <MessageBar />
      </LocalizationProvider>
    </div>
  );
};
export default App;
