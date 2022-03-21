import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LanguageBar from "../layouts/LanguageBar";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();
  const { item, status, isAuthentication } = useSelector((state) => state.user);
  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <div className="logo-container">
          <Link to={"/"}>
            <img
              src="https://weglot.com/wp-content/themes/weglotv2/dist/images/Logo.svg"
              alt="logo"
            />
          </Link>
          <LanguageBar />
        </div>

        <div className="content ml-auto">
          {isAuthentication ? <SignIn user={item} /> : <SignOut />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
