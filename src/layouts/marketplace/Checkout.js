import React, { Component } from "react";
import NavBar3 from "../partials/NavBar3";

import Empty from "../../img/empty.svg";

class Checkout extends Component {
  render() {
    return (
      <div>
        <NavBar3 title={"Checkout"} breadcrumbs={["Checkout"]} />

        <div className="checkout shopping">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <div className="block billing-details">
                  <h4 className="widget-title">Billing Details</h4>
                  <form className="checkout-form">
                    <div className="form-group">
                      <label for="full_name">Full Name</label>
                      <input type="text" className="form-control" id="full_name" placeholder="" />
                    </div>
                    <div className="form-group">
                      <label for="user_address">Address</label>
                      <input type="text" className="form-control" id="user_address" placeholder="" />
                    </div>
                    <div className="checkout-country-code clearfix">
                      <div className="form-group">
                        <label for="user_post_code">Zip Code</label>
                        <input type="text" className="form-control" id="user_post_code" name="zipcode" value="" />
                      </div>
                      <div className="form-group">
                        <label for="user_city">City</label>
                        <input type="text" className="form-control" id="user_city" name="city" value="" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="user_country">Country</label>
                      <input type="text" className="form-control" id="user_country" placeholder="" />
                    </div>
                  </form>
                </div>
                <div className="block">
                  <h4 className="widget-title">Payment Method</h4>
                  <p>Credit Cart Details (Secure payment)</p>
                  <div className="checkout-product-details">
                    <div className="payment">
                      <div className="card-details">
                        <form className="checkout-form">
                          <div className="form-group">
                            <label for="card-number">
                              Card Number <span className="required">*</span>
                            </label>
                            <input id="card-number" className="form-control" type="tel" placeholder="•••• •••• •••• ••••" />
                          </div>
                          <div className="form-group half-width padding-right">
                            <label for="card-expiry">
                              Expiry (MM/YY) <span className="required">*</span>
                            </label>
                            <input id="card-expiry" className="form-control" type="tel" placeholder="MM / YY" />
                          </div>
                          <div className="form-group half-width padding-left">
                            <label for="card-cvc">
                              Card Code <span className="required">*</span>
                            </label>
                            <input id="card-cvc" className="form-control" type="tel" maxlength="4" placeholder="CVC" />
                          </div>
                          <a href="confirmation.html" className="btn btn-main mt-20">
                            Place Order
                          </a>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="product-checkout-details">
                  <div className="block">
                    <h4 className="widget-title">Order Summary</h4>
                    <div className="media product-card">
                      <a className="float-left" href="product-single.html">
                        <img className="media-object" height="50" src={ Empty } alt="Image" style={{ objectFit: "cover" }}/>
                      </a>
                      <div className="media-body text-right">
                        <h4 className="media-heading">
                          <a href="product-single.html">Ambassador Heritage 1921</a>
                        </h4>
                        <p className="price">1 x $249</p>
                        <span className="remove">Remove</span>
                      </div>
                    </div>

                    <ul className="summary-prices list-unstyled">
                      <li>
                        <span>Subtotal:</span>
                        <span className="price">$190</span>
                      </li>
                      <li>
                        <span>Shipping:</span>
                        <span>Free</span>
                      </li>
                    </ul>
                    <div className="summary-total">
                      <span>Total</span>
                      <span>$250</span>
                    </div>
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

export default Checkout;
