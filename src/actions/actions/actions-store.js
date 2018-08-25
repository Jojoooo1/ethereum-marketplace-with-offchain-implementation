import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_STORES } from "../types/types-store";
import { AT_TX } from "../types/types-tx";

import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getStores() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores`)
      .then(function(response) {
        dispatch({ type: AT_STORES.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getApprovedStores() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores-approved`)
      .then(function(response) {
        dispatch({ type: AT_STORES.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getStoreById(id) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores/${id}`)
      .then(function(response) {
        dispatch({ type: AT_STORES.GET, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getMyStore(address) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      axios
        .get(`${END_POINT}/store/${address.toLowerCase()}`)
        .then(function(response) {
          dispatch({ type: AT_STORES.GET_MY_STORE, payload: response.data });
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  };
}

export function approveStore(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);
  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      EcommerceStore.deployed().then(function(f) {
        f.approveStore(address, { from: walletAddress, gas: 500000 }).then(function(tx) {
          dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
        });
      });
    });
  };
}

export function updateStore(storeUpdated) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);
  console.log(storeUpdated);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.updateStore(storeUpdated.name, storeUpdated.category, storeUpdated.imageHash, storeUpdated.descriptionHash, {
        from: walletAddress,
        gas: 600000
      }).then(function(tx) {
        console.log(tx);
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function removeStore(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.removeStore(address, { from: walletAddress, gas: 500000 }).then(function(tx) {
        console.log(tx);
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}
