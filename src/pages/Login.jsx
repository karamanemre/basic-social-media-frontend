import React, { useEffect, useState } from "react";
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import Input from "../layouts/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserServices from "../services/UserServices";
import ButtonWithPending from "../layouts/ButtonWithPending";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/UserSlice";
import { useTranslation } from "react-i18next";

function Login() {

  const {status,isAuthentication} = useSelector(state =>  state.user)
  const [error, setError] = useState("");
  const userService = new UserServices();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let disabled = status==="loading"
 
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
      await dispatch(login(values))
      isAuthentication ? push() : setError(t("Unauthorized"))
    },
  });
  const { username, password } = errors;

  useEffect(()=>{
    setError(undefined)
  },[values.password,values.username])

  const push = () => {
    navigate("/")
  }

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
                {error}
              </div>
            )} 
          </div>
          <div>username : user</div>
          <div>password : Aa123**</div>

          <ButtonWithPending disabled={disabled} pendingApiCall={disabled} text={t("Login")}/>
        </form>
      </div>
    </div>
  );
}


export default Login;
