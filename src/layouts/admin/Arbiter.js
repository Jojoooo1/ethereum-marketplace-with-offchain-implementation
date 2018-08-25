import React, { Component } from "react";
// import { Link } from "react-router";

import NavBar3 from "../partials/NavBar3";
// import CartItem from "./CartItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getOrdersWantingRefund } from "../../actions/index";

import OrderTable from "../components/admin/OrderTable";

class MyOrders extends Component {
  componentWillMount() {
    this.props.getOrdersWantingRefund();
  }
  render() {
    return (
      <div>
        <NavBar3 title={"My orders"} breadcrumbs={[{ url: "", name: "My orders" }]} />
        <div className="container" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getOrdersWantingRefund }, dispatch)
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
