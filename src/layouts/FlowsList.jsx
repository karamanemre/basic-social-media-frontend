import { fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePageNo,
  counterIncrease,
  deleteById,
  getFlowIdGreaterThan,
  getFlows,
  resetContent,
} from "../redux/FlowSlice";
import ProfileImage from "./ProfileImage";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useTranslation } from "react-i18next";
import { format } from "timeago.js";
import FlowListOldLoading from "./FlowListOldPostLoadingButton";
import { getUserById } from "../redux/UserSlice";
import FlowService from "../services/FlowService";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

function FlowsList(props) {

  const flowService = new FlowService();
  const [firstFlowsId, setFirstFlowsId] = useState();
  const [newFlowCount, setNewFlowCount] = useState(0);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { content } = useSelector((state) => state.flow);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { userId } = props;

  useEffect(() => {
    if (pathname === `/user/${user.username}`) {
      dispatch(resetContent());
    }
  }, []);

  useEffect(() => {
    if (content.length > 1) {
      setFirstFlowsId(content[0].id);
    }
  }, [content.length]);

  useEffect(() => {
    let looper = setInterval(() => {
      flowService
        .getFlowCount(firstFlowsId)
        .then((res) => setNewFlowCount(res.data.data));
    }, 5000);

    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstFlowsId]);

  const getAll = () => {
    dispatch(getFlowIdGreaterThan({ id: firstFlowsId }));
  };

  const handleDeleteById = (id) => {
    dispatch(deleteById(id));
  }

  return (
    <div className="flow-main">
      {newFlowCount >= 1 && (
        <div className="new-posts-button" onClick={() => getAll()}>
          {pathname !== `/user/${user.username}` && (
            <button className="btn btn-outline-primary d-flex align-items-center">
              {" "}
              {t(`There are new posts`)}
              <ArrowDropUpIcon />{" "}
            </button>
          )}
        </div>
      )}
      <div className="flow-sub">
        <div className="flow-list">
          {content && content.length < 1 && t("You haven't shared a post yet")}
          {content &&
            content.map((flow, key) => (
              <div className="card p-3 mb-3" key={key}>
                <div className="header d-flex justify-content-beetween align-items-center">
                  <div
                    className="d-flex justify-space-beetween"
                    style={{ height: "80px" }}
                  >
                    <div className="image-container">
                      <ProfileImage
                        width={45}
                        height={45}
                        src={
                          flow.user.id === user.id
                            ? user.imageUrl
                            : flow.user.imageUrl
                        }
                      />
                    </div>
                    <div className="person-information d-flex flex-column align-center ">
                      <div className="item title">
                        {flow.user.id === user.id
                          ? user.fullname
                          : flow.user.fullname}
                      </div>
                      <div className="item sub-title text-muted">
                        {flow.user.id === user.id
                          ? `@${user.username}`
                          : `@${flow.user.username}`}
                      </div>
                      <div className="item sub-title text-muted">
                        {format(flow.creationDate, i18n.language)}
                      </div>
                    </div>
                  </div>

                  <div className="card-properties">
                    <div className="dropdown">
                      <MoreVertIcon fontSize="12px" />
                      <div className="dropdown-content">
                        <div className="d-flex align-items-center" onClick={()=> handleDeleteById(flow.id) }><DeleteOutlineIcon style={{width:"20px",color:"red"}}/> Sil</div>
                        <div className="d-flex align-items-center"><EditIcon style={{width:"20px",color:"#4FA3F8"}}/> Düzenle</div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="body">{flow.content}</div>
              </div>
            ))}
          <FlowListOldLoading />
        </div>
      </div>
    </div>
  );
}

export default FlowsList;
