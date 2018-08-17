import React, { Component } from "react";
import { Link } from "react-router";

import CarrouselProduct from "../components/utils/CarrouselProduct";
import ProductDescription from "../components/product/ProductDescription";
import ProductReview from "../components/product/ProductReview";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductByOwner } from "../../actions/index";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { product: { owner: 1, id: props.params.id } };
  }
  componentWillMount() {
    this.props.getProductByOwner(this.state.product);
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
  render() {
    return (
      <div>
        <section className="single-product" style={{ marginTop: "20px" }}>
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
              <div className="col-md-5">
                <CarrouselProduct />
              </div>
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
    product: state.product
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductByOwner }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
