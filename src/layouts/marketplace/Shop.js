import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";
import ProductCard from "../components/product/ProductCard";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProducts } from "../../actions/index";
import BuyProductModal from "../components/product/BuyProductModal";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {}
    };
  }
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.web3 == null ) {
  //     this.initSmartContract();
  //   }
  // }
  componentWillMount() {
    this.props.getProducts();
  }

  renderModal(product) {
    console.log(product);
    this.setState({ selectedProduct: product });
  }
  renderProducts() {
    if (this.props.products) {
      return this.props.products.map(function(product, i) {
        return <ProductCard key={i} product={product} callback={product => this.renderModal(product)} />;
      }, this);
    }
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
    console.log(this.props.products);
    return (
      <div>
        <NavBar3 title={"Shop"} breadcrumbs={[{ url: "", name: "Shop" }]} />
        <section className="products section" style={{ padding: "40px 0" }}>
          <div className="container">
            {this.renderAlert()}
            <div className="row">{this.renderProducts()}</div>
          </div>
        </section>
        <BuyProductModal product={this.state.selectedProduct} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    web3: state.web3.web3,
    txEvent: state.txEvent
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProducts }, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
