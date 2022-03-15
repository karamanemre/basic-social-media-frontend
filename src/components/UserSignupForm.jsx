import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import UserServices from "../services/UserServices";
import { toast, ToastContainer } from "react-toastify";
import Input from "./Input";

function UserSignupForm() {
  const userService = new UserServices();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  let initialValues = {
    userName: "",
    fullName: "",
    password: "",
    passwordRepeat: "",
  };

  const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")';
  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Kullanıcı adı alanı zorunlu")
      .min(3, "Minumum 3 karakter olmalı")
      .max(255, "Maximum 255 karakter olmalı")
      ,
    fullName: Yup.string()
      .required("İsim alanı zorunlu")
      .min(1, "Minumum 1 karakter olmalı")
      .max(255, "Maximum 255 karakter olmalı"),
    password: Yup.string()
      .required("Şifre alanı zorunlu")
      .min(6, "En az 6 karakter olmalı")
      .max(32, "En fazla 32 karakter olabilir")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Şifreniz en az, bir büyük, bir küçük, bir sayı ve bir özel karakter içermelidir"
      ),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref("password"), null], "Şifreler aynı olmalı")
      .required("Şifre tekrarı zorunlu alan"),
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

  return (
    <form onSubmit={handleSubmit} className="user-signup-form">
      <div className="container">
        <h1 className="mb-4">Signup</h1>

        <Input
          name={"userName"}
          label={"User Name"}
          error={errors.userName ? errors.userName : validationErrors.userName}
          id={"userName"}
          handleChange={handleChange}
          value={values.userName}
          inputType={"text"}
        />
      
        <Input
          name={"fullName"}
          label={"Full Name"}
          error={errors.fullName}
          id={"fullName"}
          handleChange={handleChange}
          value={values.fullName}
          inputType={"text"}
        />

        <Input
          name={"password"}
          label={"Password"}
          error={errors.password}
          id={"password"}
          handleChange={handleChange}
          value={values.password}
          inputType={"password"}
        />

        <Input
          name={"passwordRepeat"}
          label={"Password Repeat"}
          error={errors.passwordRepeat}
          id={"passwordRepeat"}
          handleChange={handleChange}
          value={values.passwordRepeat}
          inputType={"password"}
        />

        <button
          type="submit"
          className="btn btn-dark mt-4"
          disabled={pendingApiCall}
        >
          {pendingApiCall && <span className="spinner-border loading-icon" />}
          Signup
        </button>
      </div>
    </form>
  );
}

export default UserSignupForm;
