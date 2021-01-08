import React from "react";
import "./ErrorMessage.css";
function ErrorMessage({ eMessage, clearError }) {
  return (
    <div className="errorMessage">
      <p>{eMessage}</p>
      <button onClick={clearError}>X</button>
    </div>
  );
}

export default ErrorMessage;
