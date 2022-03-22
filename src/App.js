import { useLocation } from "react-router";
import "./css/style.scss";
import Dashboard from "./layouts/Dashboard";
import Logo from "./layouts/Logo";
import Navbar from "./layouts/Navbar";

function App() {

  const { pathname } = useLocation();
console.log(pathname);
  return (
      <div className="App">

       {pathname!=="/login" && pathname!=="/signup" && <Navbar/>} 
       {(pathname==="/login" || pathname==="/signup") && <div style={{position:"absolute"}}>
         <div style={{padding:"2rem"}}>
           <Logo/>
         </div>
         </div>} 
        <Dashboard/>
        
      </div>
 
  );
}

export default App;
