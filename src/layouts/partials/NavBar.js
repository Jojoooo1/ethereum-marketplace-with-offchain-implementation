import React from "react";
import { Link } from "react-router";

const style = {
  paddingTop: "25px",
  paddingBottom: "25px",
  borderBottom: "1px solid #dedede"
};

import Logo from "../../img/logo.png";

const NavBar = () => {
  return (
    <div className="container">
      <div className="top-header" style={style}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" style={{ alignSelf: "start", fontStyle: "oblique" }}>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" style={{ fontSize: "12px" }}>
                Made for consensys
              </li>
            </ul>
          </div>
          <a className="" href="#">
            <div>
              <img src={Logo} alt="" style={{ height: "100px" }} />
            </div>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" />
            </ul>
            <ul className="navbar-nav navbar-right">
              {/* <li className="nav-item">
                <a className="nav-link">
                  <i className="fas fa-search" /> Search
                </a>
              </li>
              */}
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link">
                  <i className="fas fa-shopping-cart" /> Cart
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ fontSize: "1.2em" }}>
                  <i className="fas fa-user-circle" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
