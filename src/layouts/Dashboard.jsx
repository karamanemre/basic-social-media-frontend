import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LanguageBar from "../components/LanguageBar";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <LanguageBar/>
      <Routes>
        <Route exact path="/" element={ <Login />}></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default Dashboard;
