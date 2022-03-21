import React from "react";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SignOut(props) {
  const { t } = useTranslation();
  return (
    <div>
      <Link to={"/login"}>
        <button className="btn btn-outline-dark btn-sign-out">
          {t("Login")}
        </button>
      </Link>

      <Link to={"/signup"}>
        <button className="btn btn-primary signup-button btn-sign-out">
          {t("Sign Up")}
        </button>
      </Link>
    </div>
  );
}

export default SignOut;
