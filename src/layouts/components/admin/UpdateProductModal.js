import React, { Component } from "react";
import { connect } from "react-redux";

import { saveImageOnIpfs, saveTextBlolbOnIpfs } from "../../../utils/ipfsUtils";

import ipfsAPI from "ipfs-api";
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });
const ipfsUrl = "http://localhost:8080/ipfs/";

var reader;

class UpdateProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      category: "",
      description: "",
      quantity: 0,
      price: 0,
      productLoaded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  updateProduct(e) {
    e.preventDefault();
    this.closeButton.click();
    saveImageOnIpfs(reader).then(imageHash => {
      console.log(imageHash);
      saveTextBlolbOnIpfs(this.state.description).then(descriptionHash => {
        console.log(descriptionHash);
        let product = {
          id: this.state.id,
          name: this.state.name,
          category: this.state.category,
          quantity: this.state.quantity,
          price: this.state.price,
          imageHash: imageHash,
          descriptionHash: descriptionHash
        };
        this.setState({ productLoaded: false });
        this.props.callbackUpdateProduct(product);
      });
    });
  }

  handleImageChange(imageFile) {
    const file = imageFile;
    reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.product.id !== this.state.id && nextProps.product.id > 0) {
      if (nextProps.product.descriptionLink) {
        ipfs
          .cat(nextProps.product.descriptionLink)
          .then(file => {
            this.setState({ description: file.toString() });
          })
          .catch(e => console.log(e));
      } else {
        this.setState({ description: "" });
      }
      this.setState({
        id: nextProps.product.id,
        name: nextProps.product.name,
        category: nextProps.product.category,
        quantity: nextProps.product.quantity,
        price: nextProps.web3.utils.fromWei(nextProps.product.price.toString(), "ether")
      });
    }
  }

  render() {
    return (
      <div className="modal fade" id="modalUpdateProduct" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold" id="modalLabel">
                Update Product
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.updateProduct} id="updateProduct">
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="productName"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Category</label>
                  <input
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="productCategory"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productQuantity">Quantity</label>
                  <input
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    type="number"
                    className="form-control"
                    id="productQuantity"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productPrice">Price</label>
                  <input
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    type="number"
                    className="form-control"
                    id="productPrice"
                  />
                  <small>Price is defined in ETH</small>
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.description}
                    type="text"
                    className="form-control"
                    id="productDescription"
                    required
                  />
                </div>
                {this.props.product &&
                  this.props.product.imageLink && (
                    <div>
                      current photo:
                      <br />
                      <img role="presentation" width="100" src={ipfsUrl + this.props.product.imageLink} />
                      <br />
                    </div>
                  )}
                <div className="form-group">
                  <label htmlFor="storeImage">Upload a photo</label>
                  <input
                    onChange={e => this.handleImageChange(e.target.files[0])}
                    type="file"
                    className="form-control-file"
                    id="store-image"
                    aria-describedby="fileHelp"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={input => (this.closeButton = input)} className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" form="updateProduct" className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3
  };
}

export default connect(
  mapStateToProps,
  null
)(UpdateProductModal);
