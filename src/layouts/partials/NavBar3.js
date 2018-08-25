import React from "react";
import { Link } from "react-router";

const NavBar3 = props => {
  const { title, breadcrumbs } = props;
  function renderBreadCrump() {
    return breadcrumbs.map((breadcrumb, i) => {
      if (breadcrumb.url) {
        return (
          <li key={i} className="breadcrumb-item">
            <Link to={breadcrumb.url}>{breadcrumb.name}</Link>
          </li>
        );
      } else {
        return (
          <li key={i} className="breadcrumb-item" aria-current="page">
            {breadcrumb.name}
          </li>
        );
      }
    });
  }
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
                {renderBreadCrump()}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NavBar3;
