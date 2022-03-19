import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";

function SignIn(props) {
  const { t } = props;
  return (
    <div className="sign-in">
      <div className="dropdown">
        <span>
          <img
            src="https://avatars.githubusercontent.com/u/77540752?v=4"
            alt=""
          />{" "}
          <BiCaretDown />{" "}
        </span>
        <div className="dropdown-content">
          <div className="item mb-1 head">@karamanemre</div>
          <div className="item mb-1">{t("Profile")}</div>
          <div className="item mb-1">{t("Settings")}</div>
          <div className="item mb-1">{t("Log Out")}</div>
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(SignIn);
