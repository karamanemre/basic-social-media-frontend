import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/UserSlice";
import { useTranslation } from "react-i18next";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileImage from "./ProfileImage";
import axios from "axios";
import UserServices from "../services/UserServices";

function SignIn() {

  const { item, user ,loggedInUser } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userService = new UserServices();

  const handleLogOut = async () => {
    await dispatch(logout());
    userService.logout();
    navigate("/");
  };
 
  return (
    <div className="sign-in">
      <div className="dropdown">
        <span>
        <ProfileImage width={"40px"} height={"40px"} src={loggedInUser.imageUrl}/>
          <BiCaretDown />{" "}
        </span>
        <div className="dropdown-content ">
          <div className="mb-1 head "><span>{`@${loggedInUser.username}`}</span> </div>
          <Link
            to={`/user/${loggedInUser.username}`}
            className="text-decoration-none text-dark"
          >
            <div className="item mb-1"><span className="mr-2 text-dark"><PersonIcon/></span> {t("Profile")}</div>
          </Link>
          <Link to={"/settings"}>
          <div className="item mb-1 "><span className="mr-2 text-dark"><SettingsIcon/></span> {t("Settings")}</div></Link>
          <div className="item mb-1 " onClick={handleLogOut}>
          <span className="mr-2 text-dark "><LogoutIcon/></span>{t("Log Out")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
