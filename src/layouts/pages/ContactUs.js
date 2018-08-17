import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";

class AboutUs extends Component {
  render() {
    return (
      <div>
        <NavBar3 title={"Contact us"} breadcrumbs={["Contact us"]} />
        <div className="contact-section mt-5">
          <div className="container">
            <div className="row">
              <div className="contact-form col-md-12">
                <form id="contact-form" method="post" action="" role="form">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" className="form-control" name="name" id="name" />
                  </div>

                  <div className="form-group">
                    <input type="email" placeholder="Your Email" className="form-control" name="email" id="email" />
                  </div>

                  <div className="form-group">
                    <input type="text" placeholder="Subject" className="form-control" name="subject" id="subject" />
                  </div>

                  <div className="form-group">
                    <textarea rows="6" placeholder="Message" className="form-control" name="message" id="message" />
                  </div>

                  <div id="cf-submit">
                    <input type="submit" id="contact-submit" className="btn btn-lg btn-warning" value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
