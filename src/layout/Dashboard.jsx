import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Patient from "../Pages/Patient";
import Physio from "../Pages/Physio";
import Sales from "../Pages/Sales";
import ROUTES from "../config/routes";
import { useSelector } from "react-redux";
import NavBar from "../components/AppBar";
import Confirmation from "../Pages/Confirmation";

const Dashboard = () => {
  const { user_type } = useSelector((state) => state.user);
  return (
    <div>
      <NavBar />
      <Routes>
        {user_type === "patient" ? (
          <Route path={ROUTES.patient} element={<Patient />} />
        ) : null}
        {user_type === "sales" ? (
          <Route path={ROUTES.sales} element={<Sales />} />
        ) : null}
        {user_type === "physio" ? (
          <Route path={ROUTES.physio} element={<Physio />} />
        ) : null}
        {user_type === "sales" ? (
          <Route path={ROUTES.confirmation} element={<Confirmation />} />
        ) : null}
        <Route
          path="*"
          element={
            <Navigate
              replace
              to={
                user_type === "physio"
                  ? ROUTES.physio
                  : user_type === "sales"
                  ? ROUTES.sales
                  : ROUTES.patient
              }
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
