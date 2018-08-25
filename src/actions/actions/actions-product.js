import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_PRODUCTS } from "../types/types-product";
import { AT_TX } from "../types/types-tx";
import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getProductByStoreId(id) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores/${id}/products`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getProducts(category) {
  let url;
  return function(dispatch) {
    if (category) {
      url = `/products?category=${category}`;
    } else {
      url = "/products";
    }
    axios
      .get(`${END_POINT}${url}`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getProductByStoreAddress(address) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores-address/${address}/products/`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.GET_BY_STORE, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function newProduct(product) {
  console.log(product);
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.addProduct(product.name, product.category, product.quantity, product.imageHash, product.descriptionHash, web3.utils.toWei(product.price), {
        from: walletAddress,
        gas: 800000
      }).then(function(tx) {
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function updateProduct(product) {
  console.log(product);
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);
  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.updateProduct(
        product.id,
        product.name,
        product.category,
        product.quantity,
        product.imageHash,
        product.descriptionHash,
        web3.utils.toWei(product.price),
        {
          from: walletAddress,
          gas: 500000
        }
      ).then(function(tx) {
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function removeProduct(productId) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.removeProduct(productId, { from: walletAddress, gas: 500000 }).then(function(tx) {
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function getProductById(id) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/products/${id}`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.GET, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

