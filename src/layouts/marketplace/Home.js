import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getApprovedStores } from "../../actions";

import Carousel from "../components/utils/Carousel";
import SellerCard from "../components/store/StoreCard";

class Home extends Component {
  componentWillMount() {
    this.props.getApprovedStores();
  }
  render() {
    return (
      <div>
        <Carousel />
        <div>
          <section className="product-category section">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="title text-center mt-5">
                    <h2>Discover our marketplace</h2>
                  </div>
                  <div className="row">
                    {this.props.stores.map(store => {
                      return <SellerCard key={store.id} store={store} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stores: state.stores
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getApprovedStores }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
