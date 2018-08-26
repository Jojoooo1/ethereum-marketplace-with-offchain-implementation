import React, { Component } from "react";
// import { Link } from "react-router";
// import { HiddenOnlyAuth, VisibleOnlyAuth } from "./utils/wrappers.js";

// UI Components
// import LoginButtonContainer from "./user/ui/loginbutton/LoginButtonContainer";
// import LogoutButtonContainer from "./user/ui/logoutbutton/LogoutButtonContainer";

//
import NavBar1 from "./layouts/partials/NavBar";
import NavBar2 from "./layouts/partials/NavBar2";
import Footer from "./layouts/partials/Footer";

// Styles
import "./css/style.css";

class App extends Component {
  render() {
    // if (this.props.web3) {
    //   this.instantiateContract();
    // }
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

export default App;

// export default App;
