import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";
import ProductCard from "../components/product/ProductCard";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductByStoreId, getStoreById } from "../../actions/index";

class Shop extends Component {
  componentWillMount() {
    this.props.getProductByStoreId(this.props.params.id);
    this.props.getStoreById(this.props.params.id);
  }
  render() {
    return (
      <div>
        {this.props.store.name && <NavBar3 title={this.props.store.name} breadcrumbs={[this.props.store.name]} />}
        <section className="products section" style={{ padding: "40px 0" }}>
          <div className="container">
            <div className="row">
              {this.props.products.length > 0 &&
                this.props.products.map(product => {
                  return <ProductCard key={product.id} product={product} />;
                })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state.store,
    products: state.products,
    web3: state.web3.web3
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductByStoreId, getStoreById }, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
