import types from "./types";

/**
 * Create an action to warn there is no web3 connection.
 * @param {boolean} payload
 */
export function updateWeb3Status(payload) {
  return {
    type: types.UPDATE_WEB3_STATUS,
    payload
  };
}

export function web3Connected(payload) {
  return {
    type: types.CONNECTED,
    payload
  };
}

export default {
  updateWeb3Status,
  web3Connected
};
