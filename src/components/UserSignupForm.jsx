import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import UserServices from "../services/UserServices";
import { toast, ToastContainer } from "react-toastify";
import Input from "./Input";
import {withTranslation} from 'react-i18next';
import UserSignUpValidationNames from "../constants/UserSignUpValidationEnum";


function UserSignupForm(props) {
  const userService = new UserServices();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  let initialValues = {
    userName: "",
    fullName: "",
    password: "",
    passwordRepeat: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required(props.t(UserSignUpValidationNames.USER_NAME_CAN_NOT_BE_NULL))
      .min(3,props.t(UserSignUpValidationNames.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS))
      .max(255,props.t(UserSignUpValidationNames.USERNAME_MUST_BE_UP_TO_255_CHARACTERS))
      ,
    fullName: Yup.string()
      .required(props.t(UserSignUpValidationNames.FULL_NAME_CAN_NOT_BE_NULL))
      .min(1,props.t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS) )
      .max(255,props.t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS)),
    password: Yup.string()
      .required(props.t(UserSignUpValidationNames.PASSWORD_CAN_NOT_BE_NULL))
      .min(6,props.t(UserSignUpValidationNames.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS))
      .max(32,props.t(UserSignUpValidationNames.PASSWORD_MUST_BE_UP_TO_32_CHARACTERS))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        props.t(UserSignUpValidationNames.PASSWORD_PATTERN_MESSAGE)
      ),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null],props.t(UserSignUpValidationNames.PASSWORDS_DO_NOT_MATCH))
      .required(props.t(UserSignUpValidationNames.PASSWORD_CAN_NOT_BE_NULL)),
  });

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setPendingApiCall(true);
      userService
        .add(values)
        .then((response) => {
          response.data.success
            ? toast.success(response.data.message)
            : toast.error(response.data.message);
          validationErrors.userName = "";
        })
        .catch((e) => {
          const { userName } = e.response.data.data;
          setValidationErrors({ userName: userName });
        })
        .finally(() => setPendingApiCall(false));
    },
  });

  const {userName,fullName,password,passwordRepeat} = errors
  const {SIGN_UP,USER_NAME,FULL_NAME,PASSWORD,PASSWORD_REPEAT} = UserSignUpValidationNames;

  return (
    <form onSubmit={handleSubmit} className="user-signup-form">
      <div className="container">
        <h1 className="mb-4">{props.t(SIGN_UP)}</h1>

        <Input
          name={"userName"}
          label={USER_NAME}
          error={userName ? userName : validationErrors.userName}
          id={"userName"}
          handleChange={handleChange}
          value={values.userName}
          inputType={"text"}
        />
      
        <Input
          name={"fullName"}
          label={FULL_NAME}
          error={fullName}
          id={"fullName"}
          handleChange={handleChange}
          value={values.fullName}
          inputType={"text"}
        />

        <Input
          name={"password"}
          label={PASSWORD}
          error={password}
          id={"password"}
          handleChange={handleChange}
          value={values.password}
          inputType={"password"}
        />

        <Input
          name={"passwordRepeat"}
          label={PASSWORD_REPEAT}
          error={passwordRepeat}
          id={"passwordRepeat"}
          handleChange={handleChange}
          value={values.passwordRepeat}
          inputType={"password"}
        />

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={pendingApiCall || (fullName || password || passwordRepeat || userName)}
        >
          {pendingApiCall && <span className="spinner-border loading-icon" />}
          {props.t("Sign Up")}
        </button>
      </div>
    </form>
  );
}

export default withTranslation()(UserSignupForm);
