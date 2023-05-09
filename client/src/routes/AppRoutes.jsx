import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import UserAgenda from "../pages/UserAgenda";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/agenda/:codigo" element={<UserAgenda/>}></Route>
    </Routes>
  );
}

export default AppRoutes;
