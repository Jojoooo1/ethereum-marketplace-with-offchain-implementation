import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_ORDERS } from "../types/types-order";
// import store from "../../store";

// import getWeb3 from "./utils/getWeb3";
// import contract from "truffle-contract";
// import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
// const EcommerceStore = contract(ecommerce_store_artifacts);

export function getOrdersBySeller(address) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/orders-seller/${address}`)
      .then(function(response) {
        dispatch({ type: AT_ORDERS.GET_SELLER_ORDERS, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getOrdersByBuyer(address) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/orders-buyer/${address}`)
      .then(function(response) {
        dispatch({ type: AT_ORDERS.GET_BUYER_ORDERS, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}




