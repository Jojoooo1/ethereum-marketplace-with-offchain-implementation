import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import types from "./types";

export function updateWeb3Status(payload) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: types.UPDATE_WEB3_STATUS,
        payload
      });
      resolve(payload);
    });
  };
}

export function updateAccountAddress(web3) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      web3.eth.getAccounts().then(accounts => {
        dispatch({ type: types.GET_WALLET_ADDRESS, payload: accounts[0] });
        resolve(accounts[0]);
      });
    });
  };
}

export function updateAccountBalance(web3, address) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      web3.eth.getBalance(address).then(function(AccountBalance) {
        let balance = web3.utils.fromWei(AccountBalance, "ether");
        dispatch({ type: types.GET_WALLET_BALANCE, payload: balance });
        resolve(balance);
      });
    });
  };
}

export function isAdmin(address) {
  let admin;
  return dispatch => {
    return new Promise(function(resolve, reject) {
      axios
        .get(`${END_POINT}/admins/${address.toLowerCase()}`)
        .then(function(response) {
          admin = response.data ? true : false;
          dispatch({ type: types.GET_ADMIN, payload: admin });
          resolve(response.data);
        })
        .catch(function(error) {
          console.log(error);
          reject(error);
        });
    });
  };
}

// export function web3Connected(payload) {
//   return {
//     type: types.CONNECTED,
//     payload
//   };
// }
