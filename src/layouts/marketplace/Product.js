import React, { Component } from "react";
import { Link } from "react-router";

import CarrouselProduct from "../components/utils/CarrouselProduct";
import ProductDescription from "../components/product/ProductDescription";
import ProductReview from "../components/product/ProductReview";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductById } from "../../actions/index";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: { id: props.params.id } };
  }

  initSmartContract() {
    this.props.getProductById(this.state.product.id);
  }
  renderProductDescription() {
    if (this.props.product) {
      return <ProductDescription product={this.props.product} />;
    }
  }
  renderProductReview() {
    if (this.props.product) {
      return <ProductReview product={this.props.product} />;
    }
  }
  renderCarrouselProduct() {
    if (this.props.product) {
      return <CarrouselProduct images={this.props.product[4]} />;
    }
  }
  render() {
    if (this.props.web3 && this.props.product == null) {
      this.initSmartContract();
    }
    return (
      <div>
        <section className="single-product">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/home"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    <Link to={"/shop"}>Shop</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Product
                  </li>
                </ol>
              </div>
            </div>
            <div className="row mt-20">
              <div className="col-md-5">{this.renderCarrouselProduct()}</div>
              <div className="col-md-7">{this.renderProductDescription()}</div>
            </div>
            <br />

            <div className="row">
              <div className="col-md-12">{this.renderProductReview()}</div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    web3: state.web3.web3
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductById }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
