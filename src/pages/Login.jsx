import React, { useEffect, useState } from "react";
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import UserServices from "../services/UserServices";
import ButtonWithPending from "../components/ButtonWithPending";
import axios from "axios";
import WithApiProgress from "../core/WithApiProgress";

function Login(props) {

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [error, setError] = useState("");
  const userService = new UserServices();
  const { t } = props;

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
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(
      t(UserSignUpValidationNames.USER_NAME_CAN_NOT_BE_NULL)
    ),
    password: Yup.string().required(
      t(UserSignUpValidationNames.PASSWORD_CAN_NOT_BE_NULL)
    ),
  });

  const { handleSubmit,handleChange,  values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setError("")
      userService.login(values).catch((err) => {
        setError(t(err.response.data.data.message));
      })
    },
  });

  const { username, password } = errors;
  let disabled = username && password || pendingApiCall

  return (
    <div className="base-form login">
      <div className="div-up">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 mt-3"> {t("Login")}</h2>
          <div>
            <Input
              name={"username"}
              label={"User Name"}
              error={username}
              id={"username"}
              handleChange={handleChange}
              value={values.username}
              inputType={"text"}
            />
          </div>
          <div>
            <Input
              name={"password"}
              label={"Password"}
              error={password}
              id={"password"}
              handleChange={handleChange}
              value={values.password}
              inputType={"password"}
            />
            {error && (
              <div className="alert alert-danger" role="alert">
                {error ? error : null}
              </div>
            )}
          </div>

          <ButtonWithPending disabled={disabled} pendingApiCall={pendingApiCall} t={t}/>
        </form>
      </div>
    </div>
  );
}

const LoginWithTranslation = withTranslation()(Login)
//const LoginWithApiProgress = WithApiProgress(LoginWithTranslation,"/api/auth/authenticationHandle")
export default LoginWithTranslation;
