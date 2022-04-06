import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ErrorPage() {

    const { t } = useTranslation();
    const {isAuthentication} = useSelector(state =>  state.user)

  return (
    <div className="error-page alert-card">
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <div className="error-template">
              <h1>{t("Oops!")}</h1>
              <h2>{t("404 Not Found")}
                  </h2>
              <div className="error-details">
              {t("Sorry, an error has occured, Requested page not found!")}
                
              </div>
              <div className="error-actions">
                <Link
                 to={isAuthentication ? "/flow" : "/"}
                  className="btn btn-primary btn-lg"
                >
                  <span className="glyphicon glyphicon-home"></span>
                  {t("Take Me Home")}
                  
                </Link>
                <Link
                 to={isAuthentication ? "/flow" : "/"}
                  className="btn btn-default btn-lg"
                >
                  <span className="glyphicon glyphicon-envelope"></span>{t("Contact Support")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
