import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NavBar3 from "../partials/NavBar3";
import { createStore } from "../../actions/index";
import { saveImageOnIpfs, saveTextBlolbOnIpfs } from "../../utils/ipfsUtils";

var reader;

class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      imageHash: "",
      descriptionHash: "",
      description: "",
      file: null,
      content: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.createStore = this.createStore.bind(this);
  }

  createStore(e) {
    e.preventDefault();

    saveImageOnIpfs(reader).then(imgId => {
      this.setState({ imageHash: imgId });
      console.log(imgId);
      saveTextBlolbOnIpfs(this.state.description).then(descId => {
        console.log(descId);
        this.setState({ descriptionHash: descId });
        let store = {
          name: this.state.name,
          category: this.state.category,
          imageHash: this.state.imageHash,
          descriptionHash: this.state.descriptionHash
        };
        this.props.createStore(store);
      });
    });
  }

  handleImageChange(imageFile) {
    const file = imageFile;
    reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  renderAlert() {
    if (this.props.txEvent === "NewStore") {
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
        <NavBar3 title={"Create store"} breadcrumbs={[{ url: "", name: "Create" }]} />
        <div className="container">
          <div className="col-md-12">
            {this.renderAlert()}
            <form onSubmit={this.createStore} id="createStore">
              <div className="form-group">
                <label htmlFor="storeName">Name</label>
                <input
                  name="name"
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  type="text"
                  className="form-control"
                  id="storeName"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="storeCategory">Category</label>
                <select
                  name="category"
                  onChange={this.handleInputChange}
                  value={this.state.category}
                  type="text"
                  className="form-control"
                  id="storeCategory"
                  required
                >
                  <option value="" disabled>
                    Select your category
                  </option>
                  <option value="Art">Art</option>
                  <option value="Books">Books</option>
                  <option value="High-Tech">High-Tech</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Sport">Sport</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="storeDescription">Description</label>
                <textarea
                  name="description"
                  onChange={this.handleInputChange}
                  value={this.state.description}
                  type="text"
                  className="form-control"
                  id="storeDescription"
                />
              </div>
              <div className="form-group">
                <label htmlFor="storeImage">Upload a store photo</label>
                <input
                  onChange={e => this.handleImageChange(e.target.files[0])}
                  type="file"
                  className="form-control-file"
                  id="store-image"
                  aria-describedby="fileHelp"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    txEvent: state.txEvent
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createStore }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStore);
