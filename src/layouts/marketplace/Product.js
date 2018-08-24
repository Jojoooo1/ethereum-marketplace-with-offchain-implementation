import React, { Component } from "react";
import { Link } from "react-router";

// import CarrouselProduct from "../components/utils/CarrouselProduct";
import ProductDescription from "../components/product/ProductDescription";
import ProductReview from "../components/product/ProductReview";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductById } from "../../actions/index";

import defaultImage from "../../img/default-img.png";
const ipfsUrl = "http://localhost:8080/ipfs/";

class Product extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    this.props.getProductById(this.props.params.id);
    console.log(this.props.product);
  }
  render() {
    return (
      <div>
        <section className="single-product">
          <div className="container">
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
            {this.props.product.id && <ProductDescription product={this.props.product} />}
            <br />
            <div className="row">
              <div className="col-md-12">{this.props.product && <ProductReview product={this.props.product} />}</div>
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
