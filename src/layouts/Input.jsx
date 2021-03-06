import React from "react";
import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";

function Input(props) {
  const { t } = useTranslation();
  const { label, error, name, handleChange, value, id, inputType,errorColor} = props;
  let className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group mb-3">
      <label>{t(label)}</label>
      <input
        name={name}
        id={id}
        className={className}
        onChange={handleChange}
        value={value}
        type={inputType}
      />
      <small className="form-text error invalid-feedback"  style={{color:errorColor}}>
        {error && error}
      </small>
    </div>
  );
}

export default Input;
