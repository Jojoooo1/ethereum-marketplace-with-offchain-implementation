import React, { Component } from "react";
// import { Link } from "react-router";

import NavBar3 from "../partials/NavBar3";
// import CartItem from "./CartItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrdersByBuyer } from "../../actions/index";

import OrderTable from "../components/admin/OrderTable";

class MyOrders extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.account.walletAddress !== this.props.account.walletAddress && nextProps.account.walletAddress) {
      this.props.getOrdersByBuyer(nextProps.account.walletAddress);
    }
  }
  render() {
    return (
      <div>
        <NavBar3 title={"My orders"} breadcrumbs={["My orders"]} />
        <div className="container">
          <div className="col-md-12">{this.props.orders && <OrderTable orders={this.props.orders} />}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getOrdersByBuyer }, dispatch)
});

const mapStateToProps = state => {
  return {
    orders: state.buyerOrders,
    account: state.account
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyOrders);
