import React from 'react'
import { withTranslation } from 'react-i18next'

function Input(props) {
    const {label,error,name,handleChange,value,id,inputType} = props
    let className = error ? "form-control is-invalid" : "form-control is-valid"
  return (
    <div className="form-group mb-3">
    <label>{props.t(label)}</label>
    <input
      name={name}
      id={id}
      className={className}
      onChange={handleChange}
      value={value}
      type={inputType}
    />
    <small className="form-text error invalid-feedback">
      {error && error}
    </small>
  </div>
  )
}

export default withTranslation()(Input)