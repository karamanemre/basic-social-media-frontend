import React from "react";
import { useSelector } from "react-redux";
import { Link,useLocation } from "react-router-dom";

function Logo() {

  const {pathname} = useLocation()
  let width = (pathname==="/login" || pathname==="/signup") ? "175px" : "100px" ;
  const { isAuthentication } = useSelector((state) => state.user);

  return (
    <Link to={isAuthentication ? `/flow` : `/`}>
      <img
        src="https://weglot.com/wp-content/themes/weglotv2/dist/images/Logo.svg"
        alt="logo"
        width={width}
      />
    </Link>
  );
}

export default Logo;
