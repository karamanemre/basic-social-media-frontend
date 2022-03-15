import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import UserSignupForm from "../components/UserSignupForm";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" style={{zIndex:"55"}} />

      <Routes>
        <Route path="/" exact element={<UserSignupForm/>}></Route>
      </Routes>
    </div>
  );
}
