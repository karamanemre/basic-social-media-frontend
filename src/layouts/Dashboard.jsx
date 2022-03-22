import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UsersList from "../pages/UsersList";
import Home from "./Home";

function Dashboard() {

  const {isAuthentication} = useSelector(state =>  state.user)

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={ <Home />}/>
        {/* {isAuthentication===false && <Route path="/login" element={ <Login />}/>} */}
        <Route exact path="/login" element={ <Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="users/list" element={<UsersList/>}/>

        <Route  path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default Dashboard;
