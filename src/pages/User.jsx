import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import FlowsList from "../layouts/FlowsList";
import ModalButton from "../layouts/ModalButton";
import ProfileImage from "../layouts/ProfileImage";
import SharePost from "../layouts/SharePost";
import {
  getFlowsByUsername,
  resetContent,
} from "../redux/FlowSlice";
import { getUser } from "../redux/UserSlice";
import UserServices from "../services/UserServices";
import ErrorPage from "./ErrorPage";

function User(props) {
  const [error, setError] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { status, counter,paginationProperites } = useSelector((state) => state.flow);
  const { pageNo } = useSelector((state) => state.flow);

  useEffect(() => {
    dispatch(getUser(username));
  }, [username]);
  console.log(paginationProperites);

  useEffect(async () => {
    await dispatch(
      getFlowsByUsername({ username: username, pageNo: pageNo, pageSize: 2 })
    );
  }, [pageNo]);

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
                          src={
                            "https://media-exp1.licdn.com/dms/image/C5616AQEXadMuQ2moAA/profile-displaybackgroundimage-shrink_350_1400/0/1641724532432?e=1653523200&v=beta&t=Kxj_r5p244kDGC8gwaphrR3NpO2VDbxdPZ7s7p11oeI"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="profile-image-main">
                      <div className="profile-image rounded-circle">
                        <ProfileImage
                          width={"150px"}
                          height={"150px"}
                          border={"5px solid #fff"}
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
                  {/* Modal Button */}
                  <div className="button-container">
                    <ModalButton user={user} />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <FlowsList />
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
