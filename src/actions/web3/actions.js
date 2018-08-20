import types from "./types";

/**
 * Create an action to warn there is no web3 connection.
 * @param {boolean} payload
 */
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
      web3.eth
        .getAccounts()
        .then(accounts => {
          let currentAccount = accounts[0];
          dispatch({ type: types.GET_WALLET_ADDRESS, payload: currentAccount });
          return currentAccount;
        })
        .then(account => {
          resolve(account);
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

// export function web3Connected(payload) {
//   return {
//     type: types.CONNECTED,
//     payload
//   };
// }
