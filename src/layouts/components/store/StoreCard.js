import React from "react";
import { Link } from "react-router";
import StoreDefault from "../../../img/store-default.jpg";
const ipfsUrl = "http://localhost:8080/ipfs/";

const StoreCard = props => {
  let { store } = props;
  function renderStorePhoto() {
    if (store.imageLink) {
      return <img src={ipfsUrl + store.imageLink} role="presentation" />;
    } else {
      return <img src={StoreDefault} role="presentation" />;
    }
  }
  return (
    <div className="col-lg-6">
      <div className="category-box cover">
        <Link to={`/stores/${store.id}`}>
          {renderStorePhoto()}
          <div className="content">
            <h3>{store.name}</h3>
            <p>{store.category}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StoreCard;
