import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UsersList from "../pages/UsersList";
import Home from "./Home";
import ErrorPage from "../pages/ErrorPage";
import User from "../pages/User";
import Flow from "../pages/Flow";
import Settings from "../pages/Settings";

function Dashboard() {

  const {isAuthentication} = useSelector(state =>  state.user)

  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Routes>
        <Route exact path="/" element={ <Home />}/>
        <Route exact path="/login" element={ <Login />}/>
        <Route exact path="/signup" element={<Signup />}/>
        <Route exact path="/user/:username" element={<User/>}/>
        <Route exact path="/users/list" element={<UsersList/>}/>
        <Route exact path="/flow" element={<Flow/>}/>
        <Route exact path="/settings" element={<Settings/>}/>

        <Route exact path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  );
}

export default Dashboard;
