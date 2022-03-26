import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/UserSlice";
import { useTranslation } from "react-i18next";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

function SignIn() {

  const { item ,user} = useSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <div className="sign-in">
      <div className="dropdown">
        <span>
          <img
            src={user.imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}
            alt=""
          />{" "}
          <BiCaretDown />{" "}
        </span>
        <div className="dropdown-content ">
          <div className="mb-1 head "><span>{`@${user.username}`}</span> </div>
          <Link
            to={`/user/${item.username}`}
            className="text-decoration-none text-dark"
          >
            <div className="item mb-1"><span className="mr-2 text-dark"><PersonIcon/></span> {t("Profile")}</div>
          </Link>
          <div className="item mb-1 "><span className="mr-2 text-dark"><SettingsIcon/></span> {t("Settings")}</div>
          <div className="item mb-1 " onClick={handleLogOut}>
          <span className="mr-2 text-dark "><LogoutIcon/></span>{t("Log Out")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
