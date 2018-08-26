import React from "react";

// Images
import uPortLogo from "../../../img/uport-logo.svg";

const LoginButton = ({ onLoginUserClick }) => {
  return (
    <a href="#" className="btn btn-warning" style={{ width: "100%" }} onClick={event => onLoginUserClick(event)}>
      <img className="uport-logo float-left" width="25px" src={uPortLogo} alt="UPort Logo" />
      Login with UPort
    </a>
  );
};

export default LoginButton;
