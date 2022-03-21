import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import UserServices from "../services/UserServices";
import { BiCaretDown } from "react-icons/bi";
import { useTranslation } from "react-i18next";

function LanguageBar() {

  const [language,setLanguage] = useState("TR");
  const userService = new UserServices();
  const { i18n } = useTranslation();

  const onChangeLanguage = (language) => {
    const lang = language;
    setLanguage(lang.toUpperCase())
    i18n.changeLanguage(language);
    userService.changeLanguage(language);
  };

  return (
    <div className="change-language">
      <div className="disp">
        <div className="dropdown">
          <span style={{fontSize:"smaller"}}>{language} <BiCaretDown/> </span>
          <div className="dropdown-content">
            <div onClick={() => onChangeLanguage("tr")}>TR</div>
            <div onClick={() => onChangeLanguage("en")}>EN</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageBar;
