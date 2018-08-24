import React from "react";
import store from "../../../store";

const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });
const ipfsUrl = "http://localhost:8080/ipfs/";

import defaultImage from "../../../img/default-img.png";

const ProductDescription = props => {
  let { product } = props;
  let web3 = store.getState().web3.web3;

  function renderDescription() {
    if (product.descriptionLink) {
      ipfs.cat(product.descriptionLink).then(file => {
        return <p className="product-description"> file.toString() </p>;
      });
    } else {
      return <p className="product-description"> No description added yet </p>;
    }
  }

  function renderImage() {
    if (product.imageLink) {
      return (
        <img className="product-show-image" style={{ objectFit: "cover", height: "100%" }} src={ipfsUrl + product.imageLink} role="presentation" />
      );
    } else {
      return <img className="product-show-image" src={defaultImage} role="presentation" />;
    }
  }

  function renderQuantitySelection(quantity) {
    let options = [];
    for (var i = 1; i <= quantity; i++) {
      options.push(<option>{i}</option>);
    }
    return options;
  }

  return (
    <div className="row mt-20">
      <div className="col-md-5">{renderImage()}</div>
      <div className="col-md-7">
        <div className="single-product d-flex flex-column d-flex justify-content-between" style={{ height: "100%" }}>
          <h2>{product.name}</h2>
          <p className="product-price">
            Price:
            <span className="badge badge-warning" style={{ margin: "10px", color: "white", padding: "5px" }}>
              {web3 && web3.utils.fromWei(product.price.toString(), "ether")} eth
            </span>
          </p>

          {renderDescription()}

          <div className="product-quantity">
            <form>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label font-weight-bold">Quantity</label>
                <div className="col-sm-10">
                  <select className="form-control" id="select-quantity" style={{ width: "100px" }}>
                    {product.quantity && renderQuantitySelection(product.quantity)}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="product-category">
            <ul className="list-inline d-flex">
              <li className="list-inline-item">
                <span className="font-weight-bold mr-2">Categories:</span>
              </li>
              <li className="list-inline-item">
                <span className="badge badge-secondary mr-2">{product.category}</span>
              </li>
            </ul>
          </div>
          <div>
            <a href="cart.html" className="btn btn-lg btn-outline-warning mt-5">
              Buy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
