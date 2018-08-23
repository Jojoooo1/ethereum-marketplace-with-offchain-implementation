import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

const style = {
  paddingTop: "25px",
  paddingBottom: "25px",
  borderBottom: "1px solid #dedede"
};

import Logo from "../../img/logo.png";

class NavBar extends Component {
  renderDropdown() {}
  render() {
    return (
      <div className="container">
        <div className="top-header" style={style}>
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="collapse navbar-collapse" style={{ alignSelf: "start", fontStyle: "oblique" }}>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item" style={{ fontSize: "12px" }}>
                  Made for consensys
                </li>
              </ul>
            </div>
            <a className="" href="#">
              <div>
                <img src={Logo} alt="" style={{ height: "100px" }} />
              </div>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item" />
              </ul>
              <ul className="navbar-nav navbar-right" style={{ alignItems: "center" }}>
                {this.props.account.isAdmin && (
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      <button className="btn btn-secondary">
                        <i className="fa fa-power-off" aria-hidden="true" /> Admin
                      </button>
                    </Link>
                  </li>
                )}

                {this.props.myStore && (
                  <li className="nav-item">
                    <Link to={`/store/edit/${this.props.myStore.address}`} className="nav-link">
                      <button className="btn btn-secondary">
                        <i className="fas fa-cog" /> Manage Store
                      </button>
                    </Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link to={"/cart"} className="nav-link">
                    <i className="fas fa-shopping-cart" /> Cart
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    style={{ fontSize: "1.2em" }}
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {this.props.account.walletAddress ? (
                      <i className="fas fa-user-circle" style={{ color: "forestgreen", 'fontSize': '30px'}} />
                    ) : (
                      <i className="fas fa-user-circle" style={{ color: "indianred", 'fontSize': '30px' }} />
                    )}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown" style={{ maxWidth: "250px" }}>
                    <a className="dropdown-item" href="#" style={{ whiteSpace: "normal", wordWrap: "break-word" }}>
                      <div>Address: </div>
                      <span style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                        {this.props.account.walletAddress ? this.props.account.walletAddress : "No wallet connected"}
                      </span>
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">
                      <div>Balance: </div>
                      <span style={{ fontSize: "0.9em", fontWeight: "bold" }}>
                        {this.props.account.walletBalance ? this.props.account.walletBalance : ""}
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3,
    account: state.account,
    myStore: state.myStore
  };
}

export default connect(
  mapStateToProps,
  null
)(NavBar);
