import React from "react";
import { Link,useLocation} from "react-router-dom";

function Logo() {

  const { pathname } = useLocation();

  return (
    <Link to={"/"}>
      {pathname!=="/login" && pathname!=="/signup" ? 
      
      <img
        src="https://weglot.com/wp-content/themes/weglotv2/dist/images/Logo.svg"
        alt="logo"
      />
      :
      <img
        src="./img/logo-white.png"
        alt="logo"
        width={"150px"}
      />
    }
      
    </Link>
  );
}

export default Logo;
