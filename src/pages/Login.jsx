import React, { useEffect, useState } from "react";
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import Input from "../layouts/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import UserServices from "../services/UserServices";
import ButtonWithPending from "../layouts/ButtonWithPending";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/UserSlice";

function Login(props) {

  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [error, setError] = useState("");
  const userService = new UserServices();
  const { t } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {status} = useSelector(state =>  state.user)

  let initialValues = {
    username: "user",
    password: "Aa123**",
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
    onSubmit: async (values) => {
      setError("")
      await dispatch(login(values))
      setPendingApiCall(true)
      userService.login(values).then((res)=>navigate("/")).catch((err) => {
        setError(t(err.response.data.data.message));
      }).finally(setPendingApiCall(false))
    },
  });

  const { username, password } = errors;
  let disabled = pendingApiCall===true || status==="loading"

  return (
    <div className="base-form login">
      <div className="div-up">
        <form onSubmit={handleSubmit}>
          <div>username : user</div>
          <div>password : Aa123**</div>
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
                {error}
              </div>
            )} 
          </div>

          <ButtonWithPending disabled={disabled} pendingApiCall={disabled} text={t("Login")}/>
        </form>
      </div>
    </div>
  );
}

const LoginWithTranslation = withTranslation()(Login)
//const LoginWithApiProgress = WithApiProgress(LoginWithTranslation,"/api/auth/authenticationHandle")
export default LoginWithTranslation;
