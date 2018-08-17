import React, { Component } from "react";
import { Link } from "react-router";
import { HiddenOnlyAuth, VisibleOnlyAuth } from "./utils/wrappers.js";

// UI Components
import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

//
import NavBar1 from "./layouts/partials/NavBar";
import NavBar2 from "./layouts/partials/NavBar2";
import Footer from "./layouts/partials/Footer";

// Styles
import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";
import "./css/style.css";

// import getWeb3 from "./utils/getWeb3";
import contract from "truffle-contract";
import ecommerce_store_artifacts from "../build/contracts/EcommerceStore.json";
import getWeb3 from "./utils/getWeb3";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setInstance } from "./actions/index";

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     storageValue: 0,
  //     web3: null
  //   };
  // }
  instantiateContract() {
    const EcommerceStore = contract(ecommerce_store_artifacts);
    EcommerceStore.setProvider(this.props.web3.currentProvider);
    EcommerceStore.deployed().then(function(f) {
      f.getProduct.call(1).then(function(p) {
        console.log(p);
      });
    });
    // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance;
  }
  render() {
    if (this.props.web3) {
      instantiateContract();
    }
    // this.instantiateContract();
    // console.log(this.props.web3);
    // const OnlyAuthLinks = VisibleOnlyAuth(() => (
    //   <span>
    //     <li className="pure-menu-item">
    //       <Link to="/dashboard" className="pure-menu-link">
    //         Dashboard
    //       </Link>
    //     </li>
    //     <li className="pure-menu-item">
    //       <Link to="/profile" className="pure-menu-link">
    //         Profile
    //       </Link>
    //     </li>
    //     <LogoutButtonContainer />
    //   </span>
    // ));

    // const OnlyGuestLinks = HiddenOnlyAuth(() => (
    //   <span>
    //     <LoginButtonContainer />
    //   </span>
    // ));

    return (
      <div className="App">
        <NavBar1 />
        <NavBar2 />
        {/*
        <nav className="navbar pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
          <ul className="pure-menu-list navbar-right">
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </ul>
        </nav>
      */}
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapState(state) {
  return {
    web3: state.web3.web3
  };
}

function mapDispatch(/* dispatch */) {
  return {};
}

export default connect(
  mapState,
  mapDispatch
)(App);

// export default App;
