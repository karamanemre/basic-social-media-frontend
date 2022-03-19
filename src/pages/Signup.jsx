import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import UserServices from "../services/UserServices";
import { toast } from "react-toastify";
import Input from "../components/Input";
import {withTranslation} from 'react-i18next';
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import LanguageBar from "../components/LanguageBar";
import ButtonWithPending from "../components/ButtonWithPending";
import axios from "axios";
import withApiProgress from "../core/WithApiProgress";


function Signup(props) {
  const userService = new UserServices();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const {SIGN_UP,USER_NAME,FULL_NAME,PASSWORD,PASSWORD_REPEAT} = UserSignUpValidationNames;
  const { t } = props 

  useEffect(()=>{
    axios.interceptors.request.use(request => {
        setPendingApiCall(true);
        return request;
    });

    axios.interceptors.response.use(
        response => {
            setPendingApiCall(false);
            return response;
        },
        error => {
            setPendingApiCall(false);
            throw error;
        }
    );
  })

  let initialValues = {
    username: "",
    fullname: "",
    password: "",
    passwordRepeat: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required(t(UserSignUpValidationNames.USER_NAME_CAN_NOT_BE_NULL))
      .min(3,t(UserSignUpValidationNames.USERNAME_MUST_BE_AT_LEAST_3_CHARACTERS))
      .max(255,t(UserSignUpValidationNames.USERNAME_MUST_BE_UP_TO_255_CHARACTERS))
      ,
    fullname: Yup.string()
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
      userService
        .add(values)
        .then((response) => {
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

  const {username,fullname,password,passwordRepeat} = errors
  let disabled = pendingApiCall || (fullname || password || passwordRepeat || username)

  return (
    <form onSubmit={handleSubmit} className="user-signup-form base-form">
     
     <LanguageBar/>

      <div className="container">
        <h1 className="mb-4">{t(SIGN_UP)}</h1>

        <Input
          name={"username"}
          label={USER_NAME}
          error={username ? username : validationErrors.username}
          id={"username"}
          handleChange={handleChange}
          value={values.username}
          inputType={"text"}
        />
      
        <Input
          name={"fullname"}
          label={FULL_NAME}
          error={fullname}
          id={"fullname"}
          handleChange={handleChange}
          value={values.fullname}
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

        <ButtonWithPending disabled={disabled} pendingApiCall={pendingApiCall} t={t}/>
      </div>
    </form>
  );
}

const SignUpWithTranslation = withTranslation()(Signup)
//const SignUpWithApiProgress = withApiProgress()(SignUpWithTranslation,"/api/usercontroller/add")
export default SignUpWithTranslation;
