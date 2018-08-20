import React, { Component } from "react";
import store from "../../../store";
const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });

class ProductDescription extends Component {
  componentWillMount() {
    ipfs.cat(this.props.product.ipfsDescriptionHash).then(file => {
      this.renderDescription(file.toString());
      return;
    });
  }
  renderDescription(description) {
    return <p className="product-description"> description </p>;
  }
  render() {
    const { product } = this.props;
    const web3 = store.getState().web3.web3;
    return (
      <div className="single-product d-flex flex-column d-flex justify-content-between" style={{ height: "100%" }}>
        <h2>{product[1]}</h2>
        <p className="product-price">
          Price:
          <span className="badge badge-warning" style={{ margin: "10px", color: "white", padding: "5px" }}>
            {web3.utils.fromWei(product.price.toString(), "ether")} eth
          </span>
        </p>

        {this.renderDescription()}

        <div className="product-quantity">
          <form>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label font-weight-bold">Quantity</label>
              <div className="col-sm-10">
                <select className="form-control" id="select-quantity" style={{ width: "100px" }}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
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
          <a href="cart.html" className="btn btn-outline-warning mt-5">
            Add To Cart
          </a>
        </div>
      </div>
    );
  }
}

export default ProductDescription;
