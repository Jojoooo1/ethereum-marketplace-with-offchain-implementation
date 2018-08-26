import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { syncHistoryWithStore } from "react-router-redux";
import { UserIsAuthenticated } from "./utils/wrappers.js";

// Layouts
import App from "./App";
import Home from "./layouts/marketplace/Home";
import Shop from "./layouts/marketplace/Shop";
import Product from "./layouts/marketplace/Product";
import MyOrders from "./layouts/marketplace/MyOrders";
import AboutUs from "./layouts/pages/AboutUs";
import ContactUs from "./layouts/pages/ContactUs";
import Store from "./layouts/marketplace/Store";
import Stores from "./layouts/marketplace/Stores";
import Admin from "./layouts/admin/Admin";
import MyStore from "./layouts/admin/MyStore";
import Arbiter from "./layouts/admin/Arbiter";

// Redux Store
import store from "./store";
import types from "./actions/types";

const history = syncHistoryWithStore(browserHistory, store);

import { web3 } from "./utils/web3utils";
import { updateWeb3Status, updateAccountAddress, updateAccountBalance, isAdmin, getMyStore, getOrdersByBuyer, getArbiter } from "./actions/index";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="shop" component={Shop} />
        <Route path="products/:id" component={Product} />
        <Route path="my-orders" component={MyOrders} />
        <Route path="about-us" component={AboutUs} />
        <Route path="contact-us" component={ContactUs} />
        <Route path="stores" component={Stores} />
        <Route path="stores/:id" component={Store} />
        <Route path="admin" component={Admin} />
        <Route path="/store/edit/:address" component={MyStore} />
        <Route path="/arbiter" component={Arbiter} />
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
        store.dispatch(getOrdersByBuyer(account));
        store.dispatch(getArbiter(account));
        // store.dispatch(getOrdersBySeller(account));
      }
    });
  });
  web3.currentProvider.publicConfigStore.on("update", function(f) {
    if (f.selectedAddress) {
      store.dispatch(updateAccountAddress(web3)).then(account => {
        store.dispatch(updateAccountBalance(web3, account));
        store.dispatch(getMyStore(account));
        store.dispatch(isAdmin(account));
        store.dispatch(getOrdersByBuyer(account));
        store.dispatch(getArbiter(account));
        // store.dispatch(getOrdersBySeller(account));
      });
    } else {
      store.dispatch({ type: types.AT_WEB3.GET_WALLET_ADDRESS, payload: "" });
      store.dispatch({ type: types.AT_WEB3.GET_WALLET_BALANCE, payload: null });
      store.dispatch({ type: types.AT_STORES.GET_MY_STORE, payload: null });
      store.dispatch({ type: types.AT_WEB3.IS_ADMIN, payload: false });
      store.dispatch({ type: types.AT_ORDERS.GET_SELLER_ORDERS, payload: [] });
      store.dispatch({ type: "GET_ARBITER", payload: false });
      // store.dispatch({ type: types.AT_ORDERS.GET_BUYER_ORDERS, payload: [] });
    }
  });
});
