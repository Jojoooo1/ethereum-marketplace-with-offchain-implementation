import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_ORDERS } from "../types/types-order";
import { AT_TX } from "../types/types-tx";

import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

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

export function newOrder(order) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed().then(function(f) {
      f.newOrder(order.product.id, order.orderQuantity, order.orderAddress, {
        from: walletAddress,
        value: order.orderQuantity * order.product.price,
        gas: 6000000
      })
        .then(function(tx) {
          dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
          dispatch(getOrdersByBuyer(walletAddress));
        })
        .catch(function(e) {
          console.log(e);
        });
    });
  };
}

export function updateEscrow(escrow) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      if (escrow.caller === "buyer") {
        f.releaseAmountToBuyer(escrow.orderId, { from: walletAddress, gas: 300000 }).then(function(tx) {
          dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
        });
      } else {
        f.releaseAmountToSeller(escrow.orderId, { from: walletAddress, gas: 300000 }).then(function(tx) {
          dispatch({ type: AT_TX.TX_EVENT, payload: tx.logs[0].event });
        });
      }
    });
  };
}

export function getOrdersWantingRefund() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/orders-refunding`)
      .then(function(response) {
        dispatch({ type: AT_ORDERS.GET_REFUNDING_ORDERS, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
