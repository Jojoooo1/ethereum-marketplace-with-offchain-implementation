import React from "react";

import NavBar3 from "../partials/NavBar3";

import AboutUsImg from "../../img/about-us.jpg";

const AboutUs = () => {
  return (
    <div>
      <NavBar3 title={"About us"} breadcrumbs={["About us"]} />
      <section className="about section mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img className="img-responsive" src={AboutUsImg} style={{ width: "100%" }} role="presentation"/>
            </div>
            <div className="col-md-6">
              <h2 className="">About Our Shop</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius enim, accusantium repellat ex autem numquam iure officiis facere vitae itaque.</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam qui vel cupiditate exercitationem, ea fuga est velit nulla culpa modi quis iste tempora non, suscipit repellendus labore
                voluptatem dicta amet?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam qui vel cupiditate exercitationem, ea fuga est velit nulla culpa modi quis iste tempora non, suscipit repellendus labore
                voluptatem dicta amet?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
