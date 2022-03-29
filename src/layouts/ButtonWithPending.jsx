import React from "react";

function ButtonWithPending(props) {
  const { pendingApiCall, disabled, text, className } = props;

  return (
    <button
      type="submit"
      className={`btn btn-primary mt-4 ${className}`}
      disabled={disabled}
    >
      {pendingApiCall === true && (
        <span className="spinner-border loading-icon" />
      )}
      {text}
    </button>
  );
}

export default ButtonWithPending;
