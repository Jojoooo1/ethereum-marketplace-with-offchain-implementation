import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";
import ProductCard from "../components/product/ProductCard";


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductsByOwner } from "../../actions/index";

class Shop extends Component {
  componentWillMount() {
    this.props.getProductsByOwner({ owner: "owner" });
  }
  renderProducts() {
    if (this.props.products) {
      return this.props.products.map(product => {
        return <ProductCard key={product.id} product={product} />;
      });
    }
  }
  render() {
    return (
      <div>
        <NavBar3 title={"Shop"} breadcrumbs={["Shop"]}/>
        <section className="products section" style={{ padding: "40px 0" }}>
          <div className="container">
            <div className="row">{this.renderProducts()}</div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductsByOwner }, dispatch)
});

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
