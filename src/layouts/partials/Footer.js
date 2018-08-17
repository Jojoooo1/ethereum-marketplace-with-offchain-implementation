import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="footer section text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-inline d-flex justify-content-center">
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-facebook" aria-hidden="true" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#">
                    <i className="fab fa-pinterest" />
                  </a>
                </li>
              </ul>
              <ul className="list-inline d-flex justify-content-center">
                <li className="list-inline-item">
                  <Link>CONTACT US</Link>
                </li>
                <li className="list-inline-item">
                  <a href="#">SHIPPING</a>
                </li>
                <li className="list-inline-item">
                  <Link to={"/about-us"}>ABOUT US</Link>
                </li>
              </ul>
              <p className="copyright-text">Powered by JC</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
