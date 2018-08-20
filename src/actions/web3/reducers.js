import types from "./types";

const initialState = {
  web3: null
  // connected: false
};

export function web3Reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_WEB3_STATUS:
      return {
        ...state,
        web3: action.payload
      };
    default:
      return state;
  }
}

const initialAccountState = {
  walletAddress: null,
  walletBalance: null
};

export function AccountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case types.GET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload
      };
    case types.GET_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: action.payload
      };
    default:
      return state;
  }
}
