import React, { Component } from "react";

import NavBar3 from "../partials/NavBar3";
import StoreCard from "../components/store/StoreCard";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getApprovedStores } from "../../actions/index";

class Stores extends Component {
  componentWillMount() {
    this.props.getApprovedStores();
  }
  render() {
    return (
      <div>
        <NavBar3 title={"Stores"} breadcrumbs={["Stores"]} />
        <section className="products section" style={{ padding: "40px 0" }}>
          <div className="container">
            <div className="row">
              {this.props.stores &&
                this.props.stores.map(store => {
                  return <StoreCard key={store.id} store={store} />;
                })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state.stores,
    web3: state.web3.web3
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getApprovedStores }, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stores);
