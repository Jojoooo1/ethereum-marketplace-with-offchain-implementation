import React, { Component } from "react";
import { Link } from "react-router";

import NavBar3 from "../partials/NavBar3";
import CartItem from "./CartItem";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProductsByOwner } from "../../actions/index";

class Shop extends Component {
  componentWillMount() {
    this.props.getProductsByOwner({ owner: "owner" });
  }
  renderCartItems() {
    if (this.props.products) {
      return this.props.products.slice(1, 6).map(product => {
        return <CartItem key={product.id} product={product} />;
      });
    }
  }
  render() {
    return (
      <div>
        <NavBar3 title={"Cart"} breadcrumbs={["Cart"]} />
        <div className="cart shopping mt-4">
          <div className="container">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <div className="block">
                  <div className="product-list">
                    <form method="post">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="">Item Name</th>
                            <th className="">Item Price</th>
                            <th className="">Actions</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderCartItems()}</tbody>
                      </table>
                      <hr />
                      <br />
                      <Link to="checkout" className="btn btn-lg btn-warning float-right">
                        Checkout
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProductsByOwner }, dispatch)
});

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
