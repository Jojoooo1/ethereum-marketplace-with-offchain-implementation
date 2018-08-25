import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";

import { updateEscrow } from "../../../actions/actions/actions-order";

// used a class cause having error
class OrderTable extends Component {
  constructor(props) {
    super(props);
    this.updateEscrow = this.updateEscrow.bind(this);
  }
  updateEscrow(orderId, caller) {
    let escrow = { orderId: orderId, caller: caller };
    this.props.updateEscrow(escrow);
  }
  renderEscrow(order) {
    let walletAddress = this.props.account.walletAddress;
    if (order.fundDisbursed) {
      return (
        <td>
          <span className="badge badge-success">COMPLETED</span>{" "}
        </td>
      );
    } else if (walletAddress === order.buyer) {
      return (
        <td>
          <div
            className={`btn btn-sm btn-outline-success m-1 ${order.fundReleaseToSellerFromBuyer ? "disabled" : ""}`}
            onClick={e => this.updateEscrow(e, order.id, "seller")}
          >
            Refund seller
          </div>
          <div
            className={`btn btn-sm btn-outline-secondary m-1 ${order.fundReleaseToBuyerFromBuyer ? "disabled" : ""}`}
            onClick={e => this.updateEscrow(e, order.id, "buyer")}
          >
            Refund buyer
          </div>
        </td>
      );
    } else {
      return (
        <td>
          <div
            className={`btn btn-sm btn-outline-success m-1 ${order.fundReleaseToSellerFromSeller ? "disabled" : ""}`}
            onClick={e => this.updateEscrow(e, order.id, "seller")}
          >
            Refund seller
          </div>
          <div
            className={`btn btn-sm btn-outline-secondary m-1 ${order.fundReleaseToBuyerFromSeller ? "disabled" : ""}`}
            onClick={e => this.updateEscrow(e, order.id, "buyer")}
          >
            Refund buyer
          </div>
        </td>
      );
    }
  }
  renderAlert() {
    if (this.props.txEvent === "FundReleaseToSeller" || this.props.txEvent === "FundReleaseToBuyer") {
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
    return (
      <div>
        {this.renderAlert()}
        <table className="table table-hover">
          <thead className="text-center">
            <tr>
              <th scope="col">order n°</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.props.orders.length > 0 &&
              this.props.orders.map((order, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{order.id}</th>
                    <td>
                      <Link to={`/products/${order.productId}`}> {order.productId} </Link>
                    </td>
                    <td>{order.quantity}</td>
                    <td>{order.status}</td>
                    <td>{order.address}</td>
                    {this.props.account.walletAddress && this.renderEscrow(order)}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    txEvent: state.txEvent
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateEscrow }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderTable);
