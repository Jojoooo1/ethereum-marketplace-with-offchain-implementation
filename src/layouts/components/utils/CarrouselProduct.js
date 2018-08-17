import React from "react";

import Slide1 from "../../../img/empty.svg";
import Slide2 from "../../../img/empty.svg";
import Slide3 from "../../../img/empty.svg";

const CarrouselProduct = () => {
  return (
    <div id="carousel-product" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="d-block w-100" src={Slide1} alt="First slide" style={{ objectFit: "cover" }} role="presentation"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Slide2} alt="Second slide" style={{ objectFit: "cover" }} role="presentation"/>
        </div>
        <div className="carousel-item">
          <img className="d-block w-100" src={Slide3} alt="Third slide" style={{ objectFit: "cover" }} role="presentation"/>
        </div>
      </div>
      <a className="carousel-control-prev" href="#carousel-product" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carousel-product" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default CarrouselProduct;
