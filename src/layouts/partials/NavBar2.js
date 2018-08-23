import React from "react";
import { Link } from "react-router";

const style = {
  paddingTop: "25px",
  paddingBottom: "25px"
};

const NavBar2 = () => {
  return (
    <div style={style} className="nav-2">
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/shop"} className="nav-link">
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/stores"} className="nav-link">
            Marketplace
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/contact-us"} className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar2;
