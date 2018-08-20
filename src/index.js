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

// Redux Store
import store from "./store";

const history = syncHistoryWithStore(browserHistory, store);

import { web3 } from "./utils/web3utils";
import { updateWeb3Status, updateAccountAddress, updateAccountBalance } from "./actions/web3/actions";

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
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);

window.addEventListener("load", () => {
  store.dispatch(updateWeb3Status(web3)).then(web3 => {
    store.dispatch(updateAccountAddress(web3)).then(account => {
      // console.log(account);
      store.dispatch(updateAccountBalance(web3, account)).then(balance => {
        // console.log(balance);
        // UPDATE THE VALUE ON METAMASK ACCOUNT CHANGE
        web3.currentProvider.publicConfigStore.on("update", function(f) {
          store.dispatch(updateAccountAddress(web3)).then(account => {
            // console.log(account);
            store.dispatch(updateAccountBalance(web3, account)).then(balance => {
              // console.log(balance);
            });
          });
        });
      });
    });
  });
});
