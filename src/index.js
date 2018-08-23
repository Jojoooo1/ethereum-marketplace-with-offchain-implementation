import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { UserIsAuthenticated } from "./utils/wrappers.js";

// Layouts
import App from "./App";
import Home from "./layouts/home/Home";
import Dashboard from "./layouts/dashboard/Dashboard";
import Profile from "./user/layouts/profile/Profile";

import Marketplace from "./layouts/marketplace/Marketplace";
import Shop from "./layouts/marketplace/Shop";
import Product from "./layouts/marketplace/Product";
import Cart from "./layouts/marketplace/Cart";
import Checkout from "./layouts/marketplace/Checkout";
import AboutUs from "./layouts/pages/AboutUs";
import ContactUs from "./layouts/pages/ContactUs";
import Sellers from "./layouts/marketplace/Sellers";
import Admin from "./layouts/admin/Admin";
import MyStore from "./layouts/admin/MyStore";

// Redux Store
import store from "./store";
import types from "./actions/types";

const history = syncHistoryWithStore(browserHistory, store);

import { web3 } from "./utils/web3utils";
import { updateWeb3Status, updateAccountAddress, updateAccountBalance, isAdmin, getMyStore } from "./actions/index";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="dashboard" component={UserIsAuthenticated(Dashboard)} />
        <Route path="profile" component={UserIsAuthenticated(Profile)} />
        <Route path="home" component={Marketplace} />
        <Route path="shop" component={Shop} />
        <Route path="products/:id" component={Product} />
        <Route path="cart" component={Cart} />
        <Route path="checkout" component={Checkout} />
        <Route path="about-us" component={AboutUs} />
        <Route path="contact-us" component={ContactUs} />
        <Route path="sellers" component={Sellers} />
        <Route path="admin" component={Admin} />
        <Route path="/store/edit/:address" component={MyStore} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// IMPLEMENT TIMEOUT LOOKOUT ACCOUNT

window.addEventListener("load", () => {
  store.dispatch(updateWeb3Status(web3)).then(web3 => {
    store.dispatch(updateAccountAddress(web3)).then(account => {
      if (account) {
        store.dispatch(updateAccountBalance(web3, account));
        store.dispatch(getMyStore(account));
        store.dispatch(isAdmin(account));
      }
    });
  });
  console.log(types);
  web3.currentProvider.publicConfigStore.on("update", function(f) {
    if (f.selectedAddress) {
      store.dispatch(updateAccountAddress(web3)).then(account => {
        store.dispatch(updateAccountBalance(web3, account));
        store.dispatch(getMyStore(account));
        store.dispatch(isAdmin(account));
      });
    } else {
      store.dispatch({ type: types.AT_WEB3.GET_WALLET_ADDRESS, payload: "" });
      store.dispatch({ type: types.AT_WEB3.GET_WALLET_BALANCE, payload: null });
      store.dispatch({ type: types.AT_STORES.GET_MY_STORE, payload: null });
      store.dispatch({ type: types.AT_WEB3.GET_ADMIN, payload: false });
    }
  });
});
