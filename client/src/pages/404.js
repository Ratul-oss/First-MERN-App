import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error_page">
      <h2>The page which you are looking for, doesn't exists.</h2>
      <p>404 Client Error</p>
      <div className="goBackButton">
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
};

export default Error;
