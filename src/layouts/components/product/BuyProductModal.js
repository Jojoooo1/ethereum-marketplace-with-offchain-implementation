import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import ProductDescription from "./ProductDescription";
import { newOrder } from "../../../actions/actions/actions-order";

class BuyProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuantity: 1,
      orderAddress: "",
      showError: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buyProduct = this.buyProduct.bind(this);
  }

  buyProduct(e) {
    e.preventDefault();
    let enoughtBalance =
      this.props.web3.utils.toWei(this.props.account.walletBalance.toString()) > this.state.orderQuantity * this.props.product.price;

    if (enoughtBalance) {
      this.setState({ showError: false });
      this.closeButton.click();
      let order = {
        orderQuantity: this.state.orderQuantity,
        orderAddress: this.state.orderAddress,
        product: this.props.product
      };
      this.props.newOrder(order);
    } else {
      this.setState({ showError: true });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  renderQuantitySelection(quantity) {
    let options = [];
    for (var i = 1; i <= quantity; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  render() {
    return (
      <div className="modal fade" id="modalBuyProduct" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title font-weight-bold" id="modalLabel">
                Buy Product
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.product.id && <ProductDescription product={this.props.product} />}
              <br />
              <form onSubmit={this.buyProduct} id="buyProduct">
                <div className="form-group">
                  <label htmlFor="select-quantity">Quantity:</label>
                  <select
                    name="orderQuantity"
                    value={this.state.orderQuantity}
                    onChange={this.handleInputChange}
                    className="form-control"
                    id="select-quantity"
                    required
                  >
                    {this.renderQuantitySelection(this.props.product.quantity)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="orderAddress">Address to deliver</label>
                  <input
                    name="orderAddress"
                    value={this.state.orderAddress}
                    onChange={this.handleInputChange}
                    type="text"
                    className="form-control"
                    id="orderAddress"
                    required
                  />
                </div>
              </form>
              {this.state.showError && (
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                  You don't have enought balance in your wallet
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" ref={input => (this.closeButton = input)} className="btn btn-lg btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" form="buyProduct" className="btn btn-lg btn-warning">
                Buy
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
    account: state.account,
    web3: state.web3.web3
  };
}
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ newOrder }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyProductModal);
