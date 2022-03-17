import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import UserServices from "../services/UserServices";
import { toast } from "react-toastify";
import Input from "../components/Input";
import {withTranslation} from 'react-i18next';
import UserSignUpValidationNames from "../constants/UserSignUpValidationEnum";
import LanguageBar from "../components/LanguageBar";


function Signup(props) {
  const userService = new UserServices();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const {SIGN_UP,USER_NAME,FULL_NAME,PASSWORD,PASSWORD_REPEAT} = UserSignUpValidationNames;
  const { t } = props //Key value değerlerine göre translate işlemini yapan function

  let initialValues = {
    userName: "",
    fullName: "",
    password: "",
    passwordRepeat: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required(t(UserSignUpValidationNames.USER_NAME_CAN_NOT_BE_NULL))
      .min(3,t(UserSignUpValidationNames.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS))
      .max(255,t(UserSignUpValidationNames.USERNAME_MUST_BE_UP_TO_255_CHARACTERS))
      ,
    fullName: Yup.string()
      .required(t(UserSignUpValidationNames.FULL_NAME_CAN_NOT_BE_NULL))
      .min(1,t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_1_CHARACTERS) )
      .max(255,t(UserSignUpValidationNames.FULL_NAME_MUST_BE_AT_LEAST_255_CHARACTERS)),
    password: Yup.string()
      .required(t(UserSignUpValidationNames.PASSWORD_CAN_NOT_BE_NULL))
      .min(6,t(UserSignUpValidationNames.PASSWORD_MUST_BE_AT_LEAST_6_CHARACTERS))
      .max(32,t(UserSignUpValidationNames.PASSWORD_MUST_BE_UP_TO_32_CHARACTERS))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        t(UserSignUpValidationNames.PASSWORD_PATTERN_MESSAGE)
      ),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null],t(UserSignUpValidationNames.PASSWORDS_DO_NOT_MATCH))
      .required(t(UserSignUpValidationNames.PASSWORD_CAN_NOT_BE_NULL)),
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

  const onChangeLanguage = (language) => {
    const {i18n} = props;
    i18n.changeLanguage(language)
    console.log(userService.changeLanguage(language));
  }

  return (
    <form onSubmit={handleSubmit} className="user-signup-form base-form">
     
     <LanguageBar/>

      <div className="container">
        <h1 className="mb-4">{t(SIGN_UP)}</h1>

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
          {t("Sign Up")}
        </button>
      </div>
    </form>
  );
}

export default withTranslation()(Signup);
