import React from "react";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="home">
      <div className="container">
        <div className="content">
          <div className="row">
            <div className="col-6">
              <h1 className="mb-4">
                <span>Spring</span> {t("social media")}
              </h1>
              <p className="text-muted mb-5">
                {t('Chat with your friends, share and do much more with Spring social media. To do all this, create an account now and enjoy spring social media')}
              </p>
              <div className="button-container">
                <Link to={"/login"}>
                <button className="btn btn-primary btn-home">{t("Sign Up")}</button></Link>
                <button className="btn btn-dark btn-home">
                  {t("Discover spring social")}
                </button>
              </div>
            </div>
            <div className="col-6 right-bar">
              <div className="img-container">
                <img src="./img/home-image.png" alt="" />
              </div>
            </div>
          </div>
          <div className="session text-muted">{t("There is no limit to what you can do with Spring")}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
