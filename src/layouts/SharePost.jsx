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
import { getUserById } from "../redux/UserSlice";
import ImageIcon from "@mui/icons-material/Image";
import Input from "./Input";

function SharePost() {
  const flowService = new FlowService();
  const { status } = useSelector((state) => state.flow);
  const { item } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const [newImage, setNewImage] = useState("");
  const dispatch = useDispatch();
  let inputClr = newImage ? "#D4EDDA" : "#F8D7DA";

  const changeHandlerImage = async (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  let initialValues = {
    content: "",
    user: { id: item.id },
  };
  const validationSchema = Yup.object({
    content: Yup.string().required().max(255),
    user: Yup.object().required(),
  });
  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      let credential = { username: item.username, password: "Aa123**" };
      dispatch(addFlow({ values, credential }));
      dispatch(getUserById({ id: item.id }));

      status === "succeeded" && setFocused(false);
      status === "succeeded" && (values.content = "");
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
              <div className="text-area-container">

                <div className="d-flex justify-content-center align-items-center">
                  
                  <div className="image-container">
                    <div className="">
                      <ProfileImage width={"70px"} height={"70px"} />
                    </div>
                  </div>

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
                </div>
                <span style={{ float: "right" }} className="word-counter ">
                  {255 - values.content.length}
                </span>

                {focused && (
                  <div className="attachment mt-3 d-flex flex-column">
                    <div className="d-flex justify-content-center">
                      <span>
                        {/* <ImageIcon />{" "} */}
                        <input
                          type={"file"}
                          text={"image"}
                          className={""}
                          onChange={changeHandlerImage}
                          style={{ width: "5.5rem", backgroundColor: inputClr }}
                        />
                      </span>
                    </div>

                  {newImage && 
                  
                  <div className="" style={{height:"100px"}}>
                        <img
                          src={newImage}
                          width={"auto"}
                          className={"img-absolute"}
                          height={"100%"}
                        />
                    </div>}
                  </div>
                )}
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
                      setNewImage("");
                      values.content = "";
                    }}
                  >
                    {t("Close")}
                  </a>
                  <ButtonWithPending
                    disabled={error || values.content === ""}
                    className={"border-radius-2"}
                    text={t("Share")}
                    pendingApiCall={status === "loading"}
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
