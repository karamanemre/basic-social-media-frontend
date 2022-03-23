import { useLocation } from "react-router";
import "./css/style.scss";
import Dashboard from "./layouts/Dashboard";
import Logo from "./layouts/Logo";
import Navbar from "./layouts/Navbar";

function App() {

  const {pathname} = useLocation()

  return (
      <div className="App">
        {(pathname==="/login" || pathname==="/signup") && <div className="position-absolute"><Logo/></div>}
        {(pathname!=="/login" && pathname!=="/signup") &&  <Navbar/>}
        <Dashboard/>
        
      </div>
 
  );
}

export default App;
