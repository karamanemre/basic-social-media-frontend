import React from "react";
import UserSignUpValidationNames from "../constants/UserSignUpValidationEnum";
import Input from "../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { withTranslation } from "react-i18next";
import UserServices from "../services/UserServices";

function Login(props) {

  const userService = new UserServices();
  const { t } = props;

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

  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      userService.login(values)
    },
  });

  const { username, password } = errors;


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
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={username || password}

            >
              {t("Login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withTranslation()(Login);
