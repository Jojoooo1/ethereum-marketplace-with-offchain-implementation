// import axios from "axios";
// const END_POINT = "http://localhost:3001";

import { AT_ADMINS } from "../types/types-admin";
import store from "../../store";

// import getWeb3 from "./utils/getWeb3";
import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getAdmins() {
  let web3 = store.getState().web3.web3;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed()
      .then(function(f) {
        return f.getAdmins.call();
      })
      .then(admins => {
        console.log(admins);
        dispatch({ type: AT_ADMINS.GET_ALL, payload: admins });
      });
  };
}

export function addAdmin(address, id) {
  let web3 = store.getState().web3.web3;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed().then(function(f) {
      f.getProduct
        .call(id)
        .then(function(product) {
          return product;
        })
        .then(function(product) {
          console.log(product);
          dispatch({ type: AT_ADMINS.READ, payload: product });
        });
    });
  };
}

export function removeAdmin(address, id) {
  let web3 = store.getState().web3.web3;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed().then(function(f) {
      f.getProduct
        .call(id)
        .then(function(product) {
          return product;
        })
        .then(function(product) {
          console.log(product);
          dispatch({ type: AT_ADMINS.READ, payload: product });
        });
    });
  };
}
