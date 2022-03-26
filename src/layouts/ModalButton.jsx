import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../css/modal.scss";
import * as Yup from "yup";
import Input from "./Input";
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import { imagesChange, update } from "../redux/UserSlice";
import { toast } from "react-toastify";
import UserServices from "../services/UserServices";
import ButtonWithPending from "./ButtonWithPending";
import { Image, Video, Transformation } from "cloudinary-react";
import axios from "axios";

function ModalButton(props) {
  const userService = new UserServices();
  const fileReader = new FileReader();
  const { t } = useTranslation();
  const { item, user, status, isAuthentication } = useSelector(
    (state) => state.user
  );
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({ username: undefined ,unauthorized:undefined});
  const editable = item.id === user.id && isAuthentication === true;

  const changeHandlerImage = async (event) => {
    const file = event.target.files[0];
    postToCloudinary(file);
  };

  const postToCloudinary = async (file) => {
    const timestamp = Date.now() / 1000;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);
    formData.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESENT
    );
    setLoading(true);
    const img = await axios.post(
      process.env.REACT_APP_CLOUDINARY_URL,
      formData
    );
    setImage(img.data.secure_url);
    setLoading(false);
  };

  let initialValues = {
    id: 0,
    username: "",
    fullname: "",
    password: "",
    imageUrl: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t(UserSignUpValidationNames.USER_NAME_CAN_NOT_BE_NULL))
      .min(
        3,
        t(UserSignUpValidationNames.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS)
      )
      .max(
        255,
        t(UserSignUpValidationNames.USERNAME_MUST_BE_UP_TO_255_CHARACTERS)
      ),
    fullname: Yup.string()
      .required(t(UserSignUpValidationNames.FULL_NAME_CAN_NOT_BE_NULL))
      .min(
        1,
        t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS)
      )
      .max(
        255,
        t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS)
      ),
    password: Yup.string().required(
      t(UserSignUpValidationNames.PASSWORD_AUTHORIZATION)
    ),
  });

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.id = user.id;
      values.imageUrl = image === undefined ? user.imageUrl : image;
      let credential = { username: item.username, password: "Aa123**" };
      //dispatch(imagesChange({profileImage:image,backgroundImage:""}))
      setLoading(true);
      await userService
        .update(values, credential)
        .then(async (response) => {
          dispatch(update({ values, credential }));
          response.data.success
            ? toast.success(t(response.data.message))
            : toast.error(t(response.data.message));
          validationErrors.username = "";
        })
        .catch((e) => {
          const { username,message } = e.response.data.data;
          setValidationErrors({ username: username ,unauthorized:message});
        });
      setLoading(false);
    },
  });

  const changedInitialValues = (user) => {
    values.username = user.username;
    values.fullname = user.fullname;
    values.imageUrl = user.imageUrl;
  };

  
  useEffect(()=>{
    validationErrors.unauthorized=undefined
  },[values.password])


  return (
    <div id="modal-button-container">
      <div className="container">
        <div className="interior">
          {editable === true && (
            <a
              className="btn btn-outline-primary"
              href="#open-modal"
              onClick={() => changedInitialValues(user)}
            >
              {t("Edit Profile")}
            </a>
          )}
        </div>
      </div>
      <div id="open-modal" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close text-primary">
            {t("Close")}
          </a>

          <form onSubmit={handleSubmit}>
            <h2 className="mb-5 mt-3"> {t("Edit Profile")}</h2>

            <div className="text-dark">
              <Input
                name={"username"}
                label={"User Name"}
                error={
                  errors.username ? errors.username : validationErrors.username
                }
                id={"usernameModalButon"}
                handleChange={handleChange}
                value={values.username}
                inputType={"text"}
                errorColor={"red"}
              />

              <Input
                name={"fullname"}
                label={"Full Name"}
                error={errors.fullname}
                id={"fullnameModalButon"}
                handleChange={handleChange}
                value={values.fullname}
                inputType={"text"}
                errorColor={"red"}
              />

              <div>
                {t("Profile image")}
                <input
                  type="file"
                  onChange={changeHandlerImage}
                  className="form-control"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>

              <Input
                name={"password"}
                label={"Password"}
                error={errors.password}
                id={"passwordModalButon"}
                handleChange={handleChange}
                value={values.password}
                inputType={"password"}
                errorColor={"red"}
              />

              {validationErrors.unauthorized==="Unauthorized" && <div className="alert alert-danger" role="alert">
                {t("UnauthorizedUpdate")}
              </div>}

              <div>
                <ButtonWithPending
                  pendingApiCall={status === "loading"}
                  disabled={loading}
                  text={t("Updated")}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalButton;
