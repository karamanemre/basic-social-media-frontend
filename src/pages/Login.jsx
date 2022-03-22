import React, { useEffect, useState } from "react";
import UserSignUpValidationNames from "../core/UserSignUpValidationEnum";
import Input from "../layouts/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonWithPending from "../layouts/ButtonWithPending";
import {useNavigate,useLocation, Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { useTranslation } from "react-i18next";
import { login } from "../redux/UserSlice";


function Login() {

  const { item, status, isAuthentication } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const { t } = useTranslation();
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
  const { handleSubmit,handleChange,  values, errors, resetForm, } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await handleLogin(values)
      isAuthentication===true &&  navigate("/"); 
      isAuthentication===false && setError(t("Unauthorized"))
      //isAuthentication===true ? pushToHomePage() : setError(t("Unauthorized"))
    },
  });

  const handleLogin = async (value) => {
    dispatch(login(value));
  };

  useEffect(()=>{
    setError(undefined)
  },[values.password,values.username])

 


  return (
    <div className="base-form login">
      <div className="div-up">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 mt-3"> {t("Login")}</h2> 
          
          <div>
            <Input
              name={"username"}
              label={"User Name"}
              error={errors.username}
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
              error={errors.password}
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
          {/* <div>username : user</div>
          <div>password : Aa123**</div> */}

          <ButtonWithPending disabled={disabled} pendingApiCall={disabled} text={t("Login")}/>
        </form>
        <div className="mt-3">
          <span className="text-muted">Spring sosyal'e katılmak ister misiniz?</span>
         <Link to={"/signup"} style={{textDecoration:"none"}} className="font-weight-bold"> Şimdi kaydolun.</Link> 
        </div>
      </div>
    </div>
  );
}


export default Login;
