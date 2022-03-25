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

function ModalButton(props) {

  const userService = new UserServices();
  const fileReader = new FileReader();
  const { t } = useTranslation();
  const { item, user, status, isAuthentication } = useSelector(
    (state) => state.user
  );
  const [apiCall, setApiCall] = useState(false);
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [validationErrors, setValidationErrors] = useState({});
  const editable = item.id === user.id && isAuthentication === true;


    
  const changeHandlerImage = (event) => {
		const file = event.target.files[0]
    fileReader.onloadend = () => {
      setImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
	};
  
  

  let initialValues = {
    id: 0,
    username: "",
    fullname: "",
    password: "Aa123**",
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
  });

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      values.id = user.id;
      values.imageUrl = image === undefined ?  user.imageUrl : image
      let credential = { username: item.username, password: "Aa123**" };
      //dispatch(imagesChange({profileImage:image,backgroundImage:""}))
      dispatch(update({ values, credential }));
      userService
        .update(values, credential)
        .then(async (response) => {
          response.data.success
            ? toast.success(t(response.data.message))
            : toast.error(t(response.data.message));
          validationErrors.username = "";
        })
        .catch((e) => {
          const { username } = e.response.data.data;
          setValidationErrors({ username: username });
        })
    },
  });

  const changedInitialValues = (user) => {
    values.username = user.username;
    values.fullname = user.fullname;
  };
  

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

              <input 
              type="file" 
              onChange={changeHandlerImage} />

              <div>
                <ButtonWithPending
                  pendingApiCall={status==="loading"}
                  disabled={apiCall}
                  text={t("Güncelle")}
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
