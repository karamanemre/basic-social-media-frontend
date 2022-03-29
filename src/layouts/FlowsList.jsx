import { fontWeight } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePageNo, counterIncrease, getFlows } from "../redux/FlowSlice";
import ProfileImage from "./ProfileImage";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useTranslation } from "react-i18next";
import {format} from 'timeago.js'
import FlowListOldLoading from "./FlowListOldPostLoadingButton";

function FlowsList() {

  const { content } = useSelector(
    (state) => state.flow
  );
  const { user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const {i18n} = useTranslation();

  return (
    <div className="flow-main">
      <div className="flow-sub">
        <div className="flow-list">
          {content && content.length < 1 && "Henüz bir gönderi paylaşmadın"}
          {content &&
            content.map((flow, key) => (
              <div className="card p-3 mb-3" key={key}>
                <div className="header d-flex justify-space-beetween align-items-center">
                  <div
                    className="d-flex justify-space-beetween"
                    style={{ height: "80px" }}
                  >
                    <div className="image-container">
                      <ProfileImage width={45} height={45} src={flow.user.imageUrl} />
                    </div>
                    <div className="person-information d-flex flex-column align-center ">
                      <div className="item title">{flow.user.fullname}</div>
                      <div className="item sub-title text-muted">
                      {`@${flow.user.username}`}
                      </div>
                      <div className="item sub-title text-muted">
                        {format(flow.creationDate,i18n.language)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="body">{flow.content}</div>
              </div>
            ))}
         <FlowListOldLoading/>
        </div>
      </div>
    </div>
  );
}

export default FlowsList;
