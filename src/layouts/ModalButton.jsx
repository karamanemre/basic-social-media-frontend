import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "../css/modal.scss";
import * as Yup from "yup";
import Input from "./Input";

function ModalButton(props) {

  const { t } = useTranslation();
  

  let initialValues = {
    username: "s",
    fullname: "w",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });
  const { handleSubmit, handleChange, values, errors, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
    },
  });

  return (
    <div id="modal-button-container">
      <div className="container">
        <div className="interior">
          <a className="btn btn-outline-primary" href="#open-modal">
          {t("Edit profile")}
          </a>
        </div>
      </div>
      <div id="open-modal" className="modal-window">
        <div>
          <a href="#" title="Close" className="modal-close text-primary">
            {t("Close")}
          </a>

          <form onSubmit={handleSubmit}>
          <h2 className="mb-5 mt-3"> {t("Edit Profile")}</h2>

          <div>
            <Input
              name={"username"}
              label={"Username"}
              error={errors.username}
              id={"username"}
              handleChange={handleChange}
              value={values.username}
              inputType={"text"}
            />
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default ModalButton;
