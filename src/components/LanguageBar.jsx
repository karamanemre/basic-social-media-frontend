import React from "react";
import { withTranslation } from "react-i18next";
import UserServices from "../services/UserServices";

function LanguageBar(props) {

  const userService = new UserServices();

  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    console.log(userService.changeLanguage(language));
  };

  return (
    <div className="change-language">
      <div className="disp">
        <img
          src="https://countryflagsapi.com/png/tr"
          alt=""
          onClick={() => onChangeLanguage("tr")}
        />
        <img
          src="https://countryflagsapi.com/png/usa"
          alt=""
          onClick={() => onChangeLanguage("en")}
        />
      </div>
    </div>
  );
}

export default  withTranslation()(LanguageBar);
