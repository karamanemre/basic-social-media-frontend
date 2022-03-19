import React from 'react'

function ButtonWithPending(props) {
  const {pendingApiCall,disabled,t} = props
  return (
    <div>
         <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={pendingApiCall || disabled}
        >
          {pendingApiCall && <span className="spinner-border loading-icon" />}
          {t("Sign Up")}
        </button>
    </div>
  )
}

export default ButtonWithPending