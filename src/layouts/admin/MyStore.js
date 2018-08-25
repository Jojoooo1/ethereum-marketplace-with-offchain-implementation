import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getProductByStoreAddress, newProduct, removeProduct, updateStore, updateProduct, getOrdersBySeller } from "../../actions/index";

import ProductTable from "../components/admin/ProductTable";
import FormUpdateStore from "../components/admin/FormUpdateStore";
import AddProductModal from "../components/admin/AddProductModal";
import UpdateProductModal from "../components/admin/UpdateProductModal";
import OrderTable from "../components/admin/OrderTable";

class MyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {}
    };
  }
  componentWillMount() {
    this.props.getProductByStoreAddress(this.props.params.address);
    this.props.getOrdersBySeller(this.props.params.address);
  }

  setSelectedProduct(e, product) {
    this.setState({ selectedProduct: product });
  }

  newProduct(product) {
    this.props.newProduct(product);
  }

  updateProduct(product) {
    this.props.updateProduct(product);
  }

  removeProduct(productId) {
    this.props.removeProduct(productId);
  }

  updateStore(store) {
    this.props.updateStore(store);
  }
  renderAlert() {
    if (
      this.props.txEvent === "StoreUpdated" ||
      this.props.txEvent === "ProductRemoved" ||
      this.props.txEvent === "NewProduct" ||
      this.props.txEvent === "ProductUpdated"
    ) {
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
    // if (!this.props.myStore) {
    //   browserHistory.push("/");
    // }

    return (
      <div>
        {this.props.myStore && (
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a
                    className="nav-link active"
                    id="v-pills-mystore-tab"
                    data-toggle="pill"
                    href="#v-pills-mystore"
                    role="tab"
                    aria-controls="v-pills-mystore"
                    aria-selected="true"
                  >
                    My Store
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-myproducts-tab"
                    data-toggle="pill"
                    href="#v-pills-myproducts"
                    role="tab"
                    aria-controls="v-pills-myproducts"
                    aria-selected="false"
                  >
                    My products
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-myorders-tab"
                    data-toggle="pill"
                    href="#v-pills-myorders"
                    role="tab"
                    aria-controls="v-pills-myorders"
                    aria-selected="false"
                  >
                    My Orders
                  </a>
                </div>
              </div>
              <div className="col-9">
                {this.renderAlert()}
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-mystore" role="tabpanel" aria-labelledby="v-pills-mystore-tab">
                    <FormUpdateStore callbackUpdateStore={store => this.updateStore(store)} />
                  </div>
                  <div className="tab-pane fade" id="v-pills-myproducts" role="tabpanel" aria-labelledby="v-pills-myproducts-tab">
                    <div className="btn btn-primary btn-circle" data-toggle="modal" data-target="#modalNewProduct" style={{ marginBottom: "15px" }}>
                      <i className="fas fa-plus" />
                    </div>
                    <ProductTable
                      products={this.props.products}
                      callbackRemoveProduct={productId => this.removeProduct(productId)}
                      callbackUpdateProduct={(e, product) => this.setSelectedProduct(e, product)}
                    />
                  </div>
                  <div className="tab-pane fade" id="v-pills-myorders" role="tabpanel" aria-labelledby="v-pills-myorders-tab">
                    <OrderTable orders={this.props.orders} />
                  </div>
                </div>
              </div>
            </div>
            <AddProductModal callbackNewProduct={product => this.newProduct(product)} />
            <UpdateProductModal product={this.state.selectedProduct} callbackUpdateProduct={product => this.updateProduct(product)} />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3,
    myStore: state.myStore,
    products: state.products,
    txEvent: state.txEvent,
    orders: state.sellerOrders
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductByStoreAddress, newProduct, updateProduct, removeProduct, updateStore, getOrdersBySeller }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStore);
