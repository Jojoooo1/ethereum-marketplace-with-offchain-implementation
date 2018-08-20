import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getAdmins, removeAdmin, addAdmin } from "../../actions/index";

import AdminTable from "../components/admin/AdminTable";
import StoreTable from "../components/admin/StoreTable";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ""
    };
  }
  initSmartContract() {
    this.props.getAdmins();
  }
  renderAdminTable() {
    if (this.props.admins.length > 0) {
      return <AdminTable admins={this.props.admins} callback={(adminId, adminIndex) => this.removeAdmin(adminId, adminIndex)} />;
    }
  }
  renderStoreTable() {
    return <StoreTable />;
  }
  addAdminHandler(event) {
    event.preventDefault();
    console.log(this.state.address);
    this.props.addAdmin(this.state.address).then(tx => {
      console.log(tx);
    });
  }
  removeAdmin(event) {
    // console.log(this.state.address);
  }

  handleChange(event) {
    this.setState({ address: event.target.value });
  }

  render() {
    if (this.props.web3 && this.props.admins.length === 0) {
      this.initSmartContract();
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link active" id="v-pills-admins-tab" data-toggle="pill" href="#v-pills-admins" role="tab" aria-controls="v-pills-admins" aria-selected="true">
                  Admins
                </a>
                <a className="nav-link" id="v-pills-store-tab" data-toggle="pill" href="#v-pills-store" role="tab" aria-controls="v-pills-store" aria-selected="false">
                  Store
                </a>
                <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                  Messages
                </a>
                <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                  Settings
                </a>
              </div>
            </div>
            <div className="col-9">
              <div className="btn btn-primary btn-circle" data-toggle="modal" data-target="#modal" style={{ marginBottom: "15px" }}>
                <i className="fas fa-plus" />
              </div>
              <div className="tab-content" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-admins" role="tabpanel" aria-labelledby="v-pills-admins-tab">
                  {this.renderAdminTable()}
                </div>
                <div className="tab-pane fade" id="v-pills-store" role="tabpanel" aria-labelledby="v-pills-store-tab">
                  {this.renderStoreTable()}
                </div>
                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                  ...
                </div>
                <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
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
                <form onSubmit={this.addAdminHandler.bind(this)} id="addAddmin">
                  <div className="form-group">
                    <label htmlFor="address">Wallet address</label>
                    <input value={this.state.value} onChange={this.handleChange.bind(this)} type="text" className="form-control" id="address" placeholder="0x2966e3fc36c203efc6b04d......" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" form="addAddmin" className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3,
    admins: state.admins
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getAdmins, addAdmin, removeAdmin }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
