import React from "react";
import Spinner from "./Spinner";

function ButtonWithPending(props) {
  const { pendingApiCall, disabled, text, className } = props;

  return (
    <button
      type="submit"
      className={`btn btn-primary mt-4 ${className}`}
      disabled={disabled}
    >
      {pendingApiCall === true && (
        <Spinner/>
      )}
      {text}
    </button>
  );
}

export default ButtonWithPending;
