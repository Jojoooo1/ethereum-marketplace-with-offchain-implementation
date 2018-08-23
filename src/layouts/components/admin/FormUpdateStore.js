import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updateStore } from "../../../actions/index";
import { saveImageOnIpfs, saveTextBlolbOnIpfs } from "../../../utils/ipfsUtils";

import ipfsAPI from "ipfs-api";
const ipfs = ipfsAPI({ host: "localhost", port: "5001", protocol: "http" });
const ipfsUrl = "http://localhost:8080/ipfs/";

var reader;

class FormUpdateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      imageHash: "",
      descriptionHash: "",
      description: "",
      storeLoaded: false,
      file: null,
      content: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.updateStore = this.updateStore.bind(this);
  }

  updateStore(e) {
    e.preventDefault();
    if (reader) {
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
          this.props.updateStore(store);
        });
      });
    } else {
      saveTextBlolbOnIpfs(this.state.description).then(descId => {
        console.log(descId);
        this.setState({ descriptionHash: descId });
        let store = {
          name: this.state.name,
          category: this.state.category,
          imageHash: this.props.myStore.imageLink,
          descriptionHash: this.state.descriptionHash
        };
        this.props.updateStore(store);
      });
    }
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

  render() {
    if (this.props.myStore && !this.state.storeLoaded) {
      this.setState({ storeLoaded: true });
      if (this.props.myStore.descriptionLink) {
        ipfs.cat(this.props.myStore.descriptionLink).then(file => {
          this.setState({ description: file.toString() });
        });
      }
      this.setState({
        name: this.props.myStore.name,
        category: this.props.myStore.category
      });
    }
    return (
      <form onSubmit={this.updateStore} id="updateStore">
        <div className="form-group">
          <label htmlFor="storeName">Name</label>
          <input name="name" onChange={this.handleInputChange} value={this.state.name} type="text" className="form-control" id="storeName" required />
        </div>
        <div className="form-group">
          <label htmlFor="storeCategory">Category</label>
          <input
            name="category"
            onChange={this.handleInputChange}
            value={this.state.category}
            type="text"
            className="form-control"
            id="storeCategory"
            required
          />
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
            required
          />
        </div>
        {this.props.myStore &&
          this.props.myStore.imageLink && (
            <div>
              current photo:
              <br />
              <img width="200" src={ipfsUrl + this.props.myStore.imageLink} />
              <br />
            </div>
          )}
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
          Update
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    web3: state.web3.web3,
    myStore: state.myStore
  };
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateStore }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUpdateStore);
