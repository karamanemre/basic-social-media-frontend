import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
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
import {getAllUsers} from '../redux/UserSlice'
import { Link } from "react-router-dom";

function User(props) {

  const [error, setError] = useState(false);
  const { username } = useParams();
  const dispatch = useDispatch();
  const { user,items,loggedInUser,error:userError } = useSelector((state) => state.user);
  const { status, counter,paginationProperites } = useSelector((state) => state.flow);
  const { pageNo } = useSelector((state) => state.flow);
  const { pathname } = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getAllUsers())
  }, []);


  useEffect(async () => {
    if(status==="succeeded"){
      await dispatch(getUser(username));
    }
    else{
      navigate(`/user/${loggedInUser.username}`)
    }
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
                          src={user.imageUrl}
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
              <div className="right-main-container">
                {items.filter(f => f.id !== loggedInUser.id).map((m) => (
                  <div className="card mb-1" key={m.id}>
                     <Link to={`/user/${m.username}`}>
                    <div className="p-2 flex-wrap d-flex justify-content-start align-items-center">
                    <ProfileImage src={m.imageUrl} width={"30px"} height={"30px"} />
                      <div className="d-flex justify-content-start flex-column p-1">
                        {m.fullname}
                        <span className="username-user-right text-muted">{`@${m.username}`}</span>
                      </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
