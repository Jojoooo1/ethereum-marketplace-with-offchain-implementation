import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { browserHistory } from "react-router";

import { getAdmins, removeAdmin, addAdmin, getStores, approveStore, removeStore } from "../../actions/index";

import AdminTable from "../components/admin/AdminTable";
import StoreTable from "../components/admin/StoreTable";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressAdmin: "",
      addressStore: ""
    };
    this.addAdminHandler = this.addAdminHandler.bind(this);
    this.addStoreHandler = this.addStoreHandler.bind(this);
    this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    this.handleChangeStore = this.handleChangeStore.bind(this);
  }
  componentWillMount() {
    this.props.getAdmins();
    this.props.getStores();
  }

  addAdminHandler(event) {
    event.preventDefault();
    this.props.addAdmin(this.state.addressAdmin);
    this.inputElementAdmin.click();
  }
  addStoreHandler(event) {
    event.preventDefault();
    this.approveStore(this.state.addressStore);
    this.inputElementStore.click();
  }

  approveStore(storeAddress) {
    this.props.approveStore(storeAddress);
  }

  removeStore(storeAddress) {
    this.props.removeStore(storeAddress);
  }

  removeAdmin(adminAddress) {
    this.props.removeAdmin(adminAddress);
  }

  handleChangeAdmin(event) {
    this.setState({ addressAdmin: event.target.value });
  }
  handleChangeStore(event) {
    this.setState({ addressStore: event.target.value });
  }

  renderAlert() {
    if (
      this.props.txEvent === "NewAdmin" ||
      this.props.txEvent === "AdminDeleted" ||
      this.props.txEvent === "StoreApproved" ||
      this.props.txEvent === "StoreRemoved"
    ) {
      return (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Successefully send to the network, reload the page in few seconds
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.props.account.isAdmin && (
          <div className="container">
            <div className="row">
              <div className="col-3">
                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a
                    className="nav-link active"
                    id="v-pills-admins-tab"
                    data-toggle="pill"
                    href="#v-pills-admins"
                    role="tab"
                    aria-controls="v-pills-admins"
                    aria-selected="true"
                  >
                    Admins
                  </a>
                  <a
                    className="nav-link"
                    id="v-pills-store-tab"
                    data-toggle="pill"
                    href="#v-pills-store"
                    role="tab"
                    aria-controls="v-pills-store"
                    aria-selected="false"
                  >
                    Store
                  </a>
                </div>
              </div>
              <div className="col-9">
                {this.renderAlert()}
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-admins" role="tabpanel" aria-labelledby="v-pills-admins-tab">
                    <div className="btn btn-primary btn-circle" data-toggle="modal" data-target="#modalAdmin" style={{ marginBottom: "15px" }}>
                      <i className="fas fa-plus" />
                    </div>
                    <AdminTable admins={this.props.admins} callback={adminAddress => this.removeAdmin(adminAddress)} />;
                  </div>
                  <div className="tab-pane fade" id="v-pills-store" role="tabpanel" aria-labelledby="v-pills-store-tab">
                    <div className="btn btn-primary btn-circle" data-toggle="modal" data-target="#modalStore" style={{ marginBottom: "15px" }}>
                      <i className="fas fa-plus" />
                    </div>
                    <StoreTable
                      stores={this.props.stores}
                      callbackApproveStore={storeAddress => this.approveStore(storeAddress)}
                      callbackRemoveStore={storeAddress => this.removeStore(storeAddress)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal fade" id="modalAdmin" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title font-weight-bold" id="modalLabel">
                      New admin
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.addAdminHandler} id="addAddmin">
                      <div className="form-group">
                        <label htmlFor="addressAdmin">Wallet address</label>
                        <input
                          value={this.state.addressAdmin}
                          onChange={this.handleChangeAdmin}
                          type="text"
                          className="form-control"
                          id="addressAdmin"
                          placeholder="0x2966e3fc36c203efc6b04d......"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={input => (this.inputElementAdmin = input)} className="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" form="addAddmin" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal fade" id="modalStore" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title font-weight-bold" id="modalLabel">
                      New Store
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={this.addStoreHandler} id="addStore">
                      <div className="form-group">
                        <label htmlFor="addressStore">Store address</label>
                        <input
                          value={this.state.addressStore}
                          onChange={this.handleChangeStore}
                          type="text"
                          className="form-control"
                          id="addressStore"
                          placeholder="0x2966e3fc36c203efc6b04d......"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" ref={input => (this.inputElementStore = input)} className="btn btn-secondary" data-dismiss="modal">
                      Close
                    </button>
                    <button type="submit" form="addStore" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3,
    admins: state.admins,
    stores: state.stores,
    txEvent: state.txEvent,
    account: state.account
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getAdmins, getStores, addAdmin, removeAdmin, approveStore, removeStore }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
