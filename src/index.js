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

// Redux Store
import store from "./store";

const history = syncHistoryWithStore(browserHistory, store);

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
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
