import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "./Home";

function Dashboard() {

  const {isAuthentication} = useSelector(state =>  state.user)

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={ <Home />}/>
        {isAuthentication===false && <Route exact path="/login" element={ <Login />}/>}
        {/* <Route exact path="/login" element={ <Login />}/> */}
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="*" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default Dashboard;
