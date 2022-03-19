import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageBar from "../layouts/LanguageBar";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

function Navbar(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { t } = props;

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
          {isAuthenticated ? <SignIn /> : <SignOut />}
        </div>
      </div>
    </nav>
  );
}

export default withTranslation()(Navbar);
