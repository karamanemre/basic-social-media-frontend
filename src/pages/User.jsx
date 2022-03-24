import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import ModalButton from "../layouts/ModalButton";
import UserServices from "../services/UserServices";
import ErrorPage from "./ErrorPage";

function User() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const { username } = useParams();
  const userService = new UserServices();
  const { t } = useTranslation();

  useEffect(() => {
    userService
      .getUser(username)
      .then((res) => setUser(res.data.data), setError(false))
      .catch((err) => setError(true));
  }, [username]);

  return (
    <div className="user">
      {error ? (
        <div className="text-center">
          <ErrorPage />
        </div>
      ) : (
        <div className="main container">
          <div className="row">
            <div className="col-9 left-bar">
              <div className="profile-settings">
                <div className="header">
                  <div className="image">
                    <div className="background-image-main">
                      <div className="background-image">
                        <img
                          src={"https://media-exp1.licdn.com/dms/image/C5616AQEXadMuQ2moAA/profile-displaybackgroundimage-shrink_350_1400/0/1641724532432?e=1653523200&v=beta&t=Kxj_r5p244kDGC8gwaphrR3NpO2VDbxdPZ7s7p11oeI"}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="profile-image-main">
                      <div className="profile-image rounded-circle">
                        <img
                          src={"https://media-exp1.licdn.com/dms/image/C4E03AQEHOy4Qpce99g/profile-displayphoto-shrink_400_400/0/1629896589024?e=2147483647&v=beta&t=MLNMa8bTIppQbFlr8EoVTNaHdAZmBuJv8JPD-B4y5A4"}
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="body container">
                  <div className="information">
                    <div className="fullname ">{user.fullname}</div>
                    <div className="username">{`@${user.username}`}</div>
                  </div>
                  <div className="button-container">
                    <ModalButton user={user} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3 right-bar">
              <div className="right-main-container">sdasass</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
