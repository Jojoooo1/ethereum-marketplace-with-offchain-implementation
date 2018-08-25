import React, { Component } from "react";
import { Link } from "react-router";
import NavBar3 from "../partials/NavBar3";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrdersWantingRefund, updateEscrow } from "../../actions/index";

class Arbiter extends Component {
  constructor(props) {
    super(props);
    this.updateEscrow = this.updateEscrow.bind(this);
  }
  updateEscrow(order) {
    let escrow = { orderId: order.id, caller: "buyer" };
    this.props.updateEscrow(escrow);
  }
  componentWillMount() {
    this.props.getOrdersWantingRefund();
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
        <NavBar3 title={"Arbiter"} breadcrumbs={[{ url: "", name: "Arbiter" }]} />
        {this.props.arbiter && (
          <div className="container">
            <div>
              {this.renderAlert()}
              <table className="table table-hover">
                <thead className="text-center">
                  <tr>
                    <th scope="col">order n°</th>
                    <th scope="col">Product id</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Seller</th>
                    <th scope="col">Refund</th>
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
                          <td>{order.fundReleaseToBuyerFromBuyer && <span class="badge badge-warning">Asking to get refunded</span>}</td>
                          <td>{order.fundReleaseToBuyerFromSeller && <span class="badge badge-warning">Asking to refund buyer</span>}</td>
                          <td>
                            <div className="btn btn-sm btn-outline-warning m-1" onClick={e => this.updateEscrow(order)}>
                              Refund
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getOrdersWantingRefund, updateEscrow }, dispatch)
});

const mapStateToProps = state => {
  return {
    orders: state.refundOrder,
    account: state.account,
    txEvent: state.txEvent,
    arbiter: state.arbiter
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Arbiter);
