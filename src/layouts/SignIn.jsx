import React from "react";
import { withTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/UserSlice";
import { useTranslation } from "react-i18next";

function SignIn(props) {
  const { item } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const { user, isAuthentication } = props;
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
            src="https://avatars.githubusercontent.com/u/77540752?v=4"
            alt=""
          />{" "}
          <BiCaretDown />{" "}
        </span>
        <div className="dropdown-content ">
          <div className="item mb-1 head ">{`@${user.username}`}</div>
          <Link
            to={`/user/${item.username}`}
            className="text-decoration-none text-dark"
          >
            <div className="item mb-1">{t("Profile")}</div>
          </Link>
          <div className="item mb-1">{t("Settings")}</div>
          <div className="item mb-1" onClick={handleLogOut}>
            {t("Log Out")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
