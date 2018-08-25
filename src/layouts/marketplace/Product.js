import React, { Component } from "react";
import { Link } from "react-router";

// import CarrouselProduct from "../components/utils/CarrouselProduct";
import ProductDescription from "../components/product/ProductDescription";
import ProductReview from "../components/product/ProductReview";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductById } from "../../actions/index";

import BuyProductModal from "../components/product/BuyProductModal";
import defaultImage from "../../img/default-img.png";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {}
    };
  }

  componentWillMount() {
    this.props.getProductById(this.props.params.id);
  }

  renderAlert() {
    if (this.props.txEvent === "NewOrder") {
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Successefully send to the network, reload the page in few seconds
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <section className="single-product">
          <div className="container">
            {this.renderAlert()}
            <div className="row">
              <div className="col-md-12">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"}>Home</Link>
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
            {this.props.product.id && <ProductDescription product={this.props.product} productPage={true} />}
            <br />
            <div className="row">
              <div className="col-md-12">{this.props.product && <ProductReview product={this.props.product} />}</div>
            </div>
          </div>
        </section>
        <BuyProductModal product={this.props.product} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.product,
    web3: state.web3.web3,
    txEvent: state.txEvent
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductById }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
