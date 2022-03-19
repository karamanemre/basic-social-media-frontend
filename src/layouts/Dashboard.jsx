import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "./Home";

function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={ <Home />}></Route>
        <Route exact path="/login" element={ <Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route exact path="*" element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default Dashboard;
