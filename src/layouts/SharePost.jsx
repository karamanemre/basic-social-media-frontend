import { useFormik } from "formik";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ButtonWithPending from "./ButtonWithPending";
import ProfileImage from "./ProfileImage";
import * as Yup from "yup";
import FlowService from "../services/FlowService";
import { addFlow, getFlows } from "../redux/FlowSlice";

function SharePost() {

  const flowService = new FlowService()
  const { status } = useSelector((state) => state.flow);
  const { item } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();



  let initialValues = {
    content: "",
    user:{id:item.id},
  };
  const validationSchema = Yup.object({
    content: Yup.string().required().max(255),
    user: Yup.object().required()
  });
  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let credential = { username: item.username, password: "Aa123**" };
      dispatch(addFlow({values,credential}))
      status==="succeeded" && setFocused(false)
      status==="succeeded" && (values.content='')
    },
  });

  useEffect(() => {
    setError(errors.content);
  }, [errors.content]);

  return (
    <div className="share-post-main">
      <div className="share-post-sub">
        <div className="card d-flex flex-column ">
          <form onSubmit={handleSubmit}>
            <div className="card-header-content d-flex align-items-center bg-white">
              <div className="image-container">
                <div className="mb-3">

                <ProfileImage width={"70px"} height={"70px"} />
                </div>
              </div>
              <div className="text-area-container">
                <textarea
                  className="form-control"
                  name="content"
                  onChange={handleChange}
                  placeholder={"Gönderi paylaş..."}
                  rows={focused ? "3" : "1"}
                  onFocus={() => setFocused(true)}
                  value={values.content}
                  maxLength={255}
                />
                <span style={{ float: "right" }} className="word-counter ">
                  {255 - values.content.length}
                </span>
              </div>
            </div>
            <div className="card-body-content d-flex justify-content-end">
              {focused && (
                <div className="button-container">
                  <a
                    className="exit"
                    style={{ height: "30px" }}
                    onClick={() => {
                      setFocused(false);
                      values.content = "";
                    }}
                  >
                    {t("Close")}
                  </a>
                  <ButtonWithPending
                    disabled={error || values.content === ""}
                    className={"border-radius-2"}
                    text={t("Share")}
                    pendingApiCall={status==="loading"}
                  />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SharePost;
