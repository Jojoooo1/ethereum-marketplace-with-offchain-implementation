import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getProductByStoreAddress, removeProduct } from "../../actions/index";
import { saveImageOnIpfs, saveTextBlolbOnIpfs } from "../../utils/ipfsUtils";
import ProductTable from "../components/admin/ProductTable";
import FormUpdateStore from "../components/admin/FormUpdateStore";

import ipfsAPI from "ipfs-api";
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });

var reader;

class MyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      imageHash: "",
      descriptionHash: "",
      description: "",
      storeLoaded: false,
      file: null,
      content: null,
      currentProduct: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.updateStore = this.updateStore.bind(this);
  }

  componentWillMount() {
    this.props.getProductByStoreAddress(this.props.params.address);
  }

  renderStoreTable() {}

  updateStore(e) {
    e.preventDefault();
    if (reader) {
      saveImageOnIpfs(reader).then(imgId => {
        this.setState({ imageHash: imgId });
        console.log(imgId);
        saveTextBlolbOnIpfs(this.state.description).then(descId => {
          console.log(descId);
          this.setState({ descriptionHash: descId });
          let store = {
            name: this.state.name,
            category: this.state.category,
            imageHash: this.state.imageHash,
            descriptionHash: this.state.descriptionHash
          };
          this.props.updateStore(store);
        });
      });
    } else {
      saveTextBlolbOnIpfs(this.state.description).then(descId => {
        console.log(descId);
        this.setState({ descriptionHash: descId });
        let store = {
          name: this.state.name,
          category: this.state.category,
          imageHash: this.props.myStore.imageLink,
          descriptionHash: this.state.descriptionHash
        };
        this.props.updateStore(store);
      });
    }
  }

  handleImageChange(imageFile) {
    const file = imageFile;
    reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // handleModalInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     currentProduct: {
  //       ...this.state.currentProduct,
  //       [name]: value
  //     }
  //   });
  // }

  // addProduct(e) {
  //   e.preventDefault();
  //   this.props.addProduct(product);
  // }

  removeProduct(productId) {
    this.props.removeProduct(productId);
  }

  updateProduct(product) {
    this.setState({
      currentProduct: product
    });
  }

  renderAlert() {
    if (this.props.txEvent === "StoreUpdated") {
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
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a
                  className="nav-link active"
                  id="v-pills-admins-tab"
                  data-toggle="pill"
                  href="#v-pills-admins"
                  role="tab"
                  aria-controls="v-pills-admins"
                  aria-selected="true"
                >
                  My Store
                </a>
                <a
                  className="nav-link"
                  id="v-pills-store-tab"
                  data-toggle="pill"
                  href="#v-pills-store"
                  role="tab"
                  aria-controls="v-pills-store"
                  aria-selected="false"
                >
                  My products
                </a>
              </div>
            </div>
            <div className="col-9">
              {this.renderAlert()}
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-admins" role="tabpanel" aria-labelledby="v-pills-admins-tab">
                  <FormUpdateStore />
                </div>
                <div className="tab-pane fade" id="v-pills-store" role="tabpanel" aria-labelledby="v-pills-store-tab">
                  <div className="btn btn-primary btn-circle" data-toggle="modal" data-target="#modalStore" style={{ marginBottom: "15px" }}>
                    <i className="fas fa-plus" />
                  </div>
                  <ProductTable
                    products={this.props.products}
                    callbackRemoveProduct={productId => this.removeProduct(productId)}
                    callbackUpdateProduct={product => this.updateProduct(product)}
                  />
                  ;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3,
    myStore: state.myStore,
    products: state.products,
    txEvent: state.txEvent
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductByStoreAddress, removeProduct }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyStore);
