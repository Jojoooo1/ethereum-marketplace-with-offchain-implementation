import React, { Component } from "react";

import Carousel from "../components/utils/Carousel";
import Seller1 from "../../img/seller1.jpg";
import SellerCard from "../components/SellerCard";

class Marketplace extends Component {
  render() {
    return (
      <div>
        <Carousel />
        <div>
          <section className="product-category section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title text-center mt-5">
                    <h2>Discover our marketplace</h2>
                  </div>
                  <div className="row">
                    <SellerCard />
                    <SellerCard />
                    <SellerCard />
                    <SellerCard />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Marketplace;
