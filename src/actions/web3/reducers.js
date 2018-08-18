import types from "./types";

const initialState = {
  web3: null,
  connected: false
};

export function web3Reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_WEB3_STATUS:
      return {
        ...state,
        web3: action.payload
      };
    case types.CONNECTED:
      return {
        ...state,
        connected: action.payload
      };
    default:
      return state;
  }
}

export default web3Reducer;
