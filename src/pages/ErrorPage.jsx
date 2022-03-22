import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function ErrorPage() {

    const { t } = useTranslation();

  return (
    <div className="error-page">
      <div className="container">
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
                 to={"/"}
                  className="btn btn-primary btn-lg"
                >
                  <span className="glyphicon glyphicon-home"></span>
                  {t("Take Me Home")}
                  
                </Link>
                <Link
                 to={"/"}
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
