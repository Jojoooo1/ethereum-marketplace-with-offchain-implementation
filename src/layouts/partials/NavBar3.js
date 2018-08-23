import React from "react";
import { Link } from "react-router";

const NavBar3 = props => {
  const { title, breadcrumbs } = props;
  return (
    <div>
      <section className="page-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="page-name">{title}</h1>

              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                {breadcrumbs.map(breadcrumb => {
                  return (
                    <li key={breadcrumb} className="breadcrumb-item" aria-current="page">
                      {breadcrumb}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavBar3;
