import React from "react";

import Seller1 from "../../img/seller1.jpg";

const SellerCard = props => {
  return (
    <div className="col-lg-6">
      <div className="category-box cover">
        <a href="">
          <img src={Seller1} alt="" />
          <div className="content">
            <h3>Clothes Sales</h3>
            <p>Shop New Season Clothing</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SellerCard;
