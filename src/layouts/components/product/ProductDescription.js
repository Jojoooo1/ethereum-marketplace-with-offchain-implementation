import React, { Component } from "react";
import { connect } from "react-redux";

const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });
const ipfsUrl = "http://localhost:8080/ipfs/";

import defaultImage from "../../../img/default-img.png";

class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "No description has been added yet",
      descriptionLoaded: false
    };
  }

  componentWillMount(nextProps, nextState) {
    this.setState({ descriptionLoaded: false });
  }

  renderImage() {
    if (this.props.product.imageLink) {
      return (
        <img
          className="product-show-image"
          style={{ objectFit: "cover", height: "100%" }}
          src={ipfsUrl + this.props.product.imageLink}
          role="presentation"
        />
      );
    } else {
      return <img className="product-show-image" src={defaultImage} role="presentation" />;
    }
  }
  render() {
    if (this.props.product.descriptionLink && !this.state.descriptionLoaded) {
      ipfs.cat(this.props.product.descriptionLink).then(file => {
        this.setState({ description: file.toString() });
        this.setState({ descriptionLoaded: true });
      });
    }
    return (
      <div className="row mt-20">
        <div className="col-md-5">{this.renderImage()}</div>
        <div className="col-md-7">
          <div className="single-product d-flex flex-column d-flex justify-content-between" style={{ height: "100%" }}>
            <h2>{this.props.product.name}</h2>
            <p className="product-price">
              Price:
              <span className="badge badge-warning" style={{ margin: "10px", color: "white", padding: "5px" }}>
                {this.props.web3 && this.props.web3.utils.fromWei(this.props.product.price.toString(), "ether")} eth
              </span>
            </p>
            <p className="product-description">{this.state.description}</p>
            <div className="product-category">
              in stock: <span className="font-weight-bold mr-2">{this.props.product.quantity}</span>
              <br />
              <br />
              <ul className="list-inline d-flex">
                <li className="list-inline-item">
                  <span className="font-weight-bold mr-2">Categories:</span>
                </li>
                <li className="list-inline-item">
                  <span className="badge badge-secondary mr-2">{this.props.product.category}</span>
                </li>
              </ul>
            </div>
            <div>
              {this.props.productPage && (
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
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3
  };
}

export default connect(
  mapStateToProps,
  null
)(ProductDescription);
