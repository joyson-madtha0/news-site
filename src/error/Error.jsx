import React from "react";
import "./Error.css";

export default function Error() {
  return (
    <div className="error-container">
      <div className="error">
        <h2>Something went wrong</h2>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );
}
