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

          <div className="product-category">
            in stock: <span className="font-weight-bold mr-2">{product.quantity}</span>
            <br />
            <br />
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
            {props.productPage && (
              <a
                href="javascript:void(0);"
                role="button"
                data-target="#modalBuyProduct"
                data-toggle="modal"
                className="btn btn-lg btn-outline-warning mt-5"
              >
                Buy
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
