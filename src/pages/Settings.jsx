import React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LanguageBar from "../layouts/LanguageBar";
import LanguageIcon from "@mui/icons-material/Language";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import HideImageIcon from "@mui/icons-material/HideImage";

function Settings() {
  return (
    <div className="settings">
      <div className="main container">
        <div className="properties ">
          <div className="d-flex align-items-center s-items">
            <LanguageIcon />{" "}
            <span>
              <LanguageBar />
            </span>{" "}
          </div>
          <div className="d-flex align-items-center s-items" data-toggle="tooltip" data-placement="top" title="Profil fotoğrafını sadece sen görebilrsin başkaları göremez">
            <HideImageIcon /> <span>Profil fotoğrafını gizle</span>
          </div>
          <div className="d-flex align-items-center s-items">
            <ChangeCircleIcon /> <span>Kullanıcı adını değiştir</span>
          </div>
          <div className="d-flex align-items-center s-items">
            <NoEncryptionIcon /> <span>Şifreni Değiştir</span>
          </div>
          <div className="d-flex align-items-center remove-user s-items">
            <PersonRemoveIcon /> <span>Hesabı Sil</span>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
