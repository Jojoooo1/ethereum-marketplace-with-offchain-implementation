import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_ADMINS } from "../types/types-admin";
import { AT_TX } from "../types/types-tx";
import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getAdmins() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/admins`)
      .then(function(response) {
        dispatch({ type: AT_ADMINS.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function addAdmin(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.addAdmin(address, { from: walletAddress, gas: 600000 }).then(function(tx) {
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function removeAdmin(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.removeAdmin(address, { from: walletAddress, gas: 600000 }).then(function(tx) {
        dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
      });
    });
  };
}

export function getArbiter(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed().then(function(f) {
      f.arbiter.call().then(function(address) {
        if (walletAddress == address) dispatch({ type: "GET_ARBITER", payload: true });
      });
    });
  };
}
