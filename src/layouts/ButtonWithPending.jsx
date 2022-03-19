import React from 'react'

function ButtonWithPending(props) {
  const {pendingApiCall,disabled,text} = props
  return (
    <div>
         <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={pendingApiCall || disabled}
        >
          {pendingApiCall && <span className="spinner-border loading-icon" />}
          {text}
        </button>
    </div>
  )
}

export default ButtonWithPending