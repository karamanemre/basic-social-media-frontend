import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import SecureLS from "secure-ls";
import "./css/style.scss";
import Dashboard from "./layouts/Dashboard";
import Logo from "./layouts/Logo";
import Navbar from "./layouts/Navbar";
import UserServices from "./services/UserServices";

function App() {

  const secureLS = new SecureLS();
  const userService = new UserServices();
  const {pathname} = useLocation()
  const { isAuthentication,token } = useSelector((state) => state.user);

  useEffect(()=>{
    if(secureLS.get("authorization") && isAuthentication){
      axios.defaults.headers['Authorization'] = secureLS.get("authorization")
    }
    userService.setAxiosHeader(token)
  },[isAuthentication])


  return (
      <div className={`App`}>
        {(pathname==="/login" || pathname==="/signup") && <div className="position-absolute"><Logo/></div>}
        {(pathname!=="/login" && pathname!=="/signup") &&  <Navbar/>}
        <Dashboard/>
      </div>
 
  );
}

export default App;
