import React, { Component } from "react";
import { connect } from "react-redux";

import { saveImageOnIpfs, saveTextBlolbOnIpfs } from "../../../utils/ipfsUtils";

var reader;

class AddProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      description: "",
      quantity: 0,
      productPrice: "",
      price: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(e) {
    e.preventDefault();
    this.closeButton.click();
    saveImageOnIpfs(reader).then(imageHash => {
      console.log(imageHash);
      saveTextBlolbOnIpfs(this.state.description).then(descriptionHash => {
        console.log(descriptionHash);
        let product = {
          name: this.state.name,
          category: this.state.category,
          quantity: this.state.quantity,
          price: this.state.price,
          imageHash: imageHash,
          descriptionHash: descriptionHash
        };
        this.props.callbackNewProduct(product);
      });
    });
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

  render() {
    return (
      <div className="modal fade" id="modalNewProduct" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold" id="modalLabel">
                New Product
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.addProduct} id="addProduct">
                <div className="form-group">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    id="productName"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="productCategory">Category</label>
                  <select
                    name="category"
                    onChange={this.handleInputChange}
                    value={this.state.category}
                    type="text"
                    className="form-control"
                    id="productCategory"
                    required
                  >
                    <option>Art</option>
                    <option>Books</option>
                    <option>High-Tech</option>
                    <option>Clothing</option>
                    <option>Sport</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="productQuantity">Quantity</label>
                  <input
                    name="quantity"
                    value={this.state.quantity}
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
                    type="number"
                    className="form-control"
                    id="productPrice"
                    required
                  />
                  <small>Price is defined in ETH</small>
                </div>
                <div className="form-group">
                  <label htmlFor="productDescription">Description</label>
                  <textarea
                    name="description"
                    onChange={this.handleInputChange}
                    value={this.state.description}
                    type="text"
                    className="form-control"
                    id="productDescription"
                    required
                  />
                </div>

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
              <button type="submit" form="addProduct" className="btn btn-primary">
                Add
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
)(AddProductModal);
