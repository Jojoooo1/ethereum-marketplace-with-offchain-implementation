import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";
import ProductCard from "../components/product/ProductCard";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductsByOwner } from "../../actions/index";
import { getProductByOwner } from "../../actions/index";
import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";

class Shop extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.web3 == null ) {
  //     this.initSmartContract();
  //   }
  // }
  initSmartContract() {
    this.props.getProductsByOwner();
  }
  renderProducts() {
    // console.log(this.props.products);
    if (this.props.products) {
      console.log(this.props.products);
      return this.props.products.map(function(product, i) {
        return <ProductCard key={i} product={product} />;
      });
    }
  }
  render() {
    if (this.props.web3 && this.props.products.length === 0) {
      this.initSmartContract();
    }
    return (
      <div>
        <NavBar3 title={"Shop"} breadcrumbs={["Shop"]} />
        <section className="products section" style={{ padding: "40px 0" }}>
          <div className="container">
            <div className="row">{this.renderProducts()}</div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    web3: state.web3.web3
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductsByOwner }, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
