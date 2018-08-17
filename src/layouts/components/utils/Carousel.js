import React from "react";

import Slide1 from "../../../img/slide-1.jpg";
import Slide2 from "../../../img/slide-2.jpg";
import Slide3 from "../../../img/slide-3.jpg";

import "./carousel.css"

const Carrousel = () => {
  return (
    <div>
      <div id="carousel-home" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carousel-home" data-slide-to="0" className="active" />
          <li data-target="#carousel-home" data-slide-to="1" />
          <li data-target="#carousel-home" data-slide-to="2" />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src={Slide1} alt="First slide" role="presentation"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Slide2} alt="Second slide" role="presentation"/>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={Slide3} alt="Third slide" role="presentation"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carousel-home" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carousel-home" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Carrousel;
