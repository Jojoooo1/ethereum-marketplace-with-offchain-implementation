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
  getProduct(e) {
    this.props.getProducts(e.target.getAttribute("value"));
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
            <div className="row">
              <div className="col-md-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a
                    className="nav-link active"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    aria-selected="true"
                    onClick={e => this.getProduct(e)}
                    value=""
                    aria-selected="false"
                  >
                    ALL
                  </a>
                  <a
                    className="nav-link"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    onClick={e => this.getProduct(e)}
                    value="Art"
                    aria-selected="false"
                  >
                    Art
                  </a>
                  <a
                    className="nav-link"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    onClick={e => this.getProduct(e)}
                    value="Books"
                    aria-selected="false"
                  >
                    Books
                  </a>
                  <a
                    className="nav-link"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    onClick={e => this.getProduct(e)}
                    value="High-Tech"
                    aria-selected="false"
                  >
                    High-Tech
                  </a>
                  <a
                    className="nav-link"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    onClick={e => this.getProduct(e)}
                    value="Clothing"
                    aria-selected="false"
                  >
                    Clothing
                  </a>
                  <a
                    className="nav-link"
                    data-toggle="pill"
                    href="#v-pills-products"
                    role="tab"
                    aria-controls="v-pills-products"
                    onClick={e => this.getProduct(e)}
                    value="Sport"
                    aria-selected="false"
                  >
                    Sport
                  </a>
                </div>
              </div>
              <div className="col-md-9">
                <div className="row">{this.renderProducts()}</div>
              </div>
            </div>
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
