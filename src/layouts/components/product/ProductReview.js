import React from "react";

const ProductDescription = props => {
  const { product } = props;
  return (
    <div>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
            Description
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
            Review
          </a>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div style={{ padding: "20px", border: "1px solid whiteSmoke" }} className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <h4>Product description: </h4>
          {product.description}
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          ...
        </div>
      </div>
      <br/>
    </div>
  );
};

export default ProductDescription;
