import types from "./types";

const initialState = {
  web3: null
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
  walletAddress: "",
  walletBalance: 0,
  isAdmin: false
};

export function AccountReducer(state = initialAccountState, action) {
  switch (action.type) {
    case types.GET_WALLET_ADDRESS:
      return {
        ...state,
        walletAddress: action.payload ? action.payload.toLowerCase() : action.payload
      };
    case types.GET_WALLET_BALANCE:
      return {
        ...state,
        walletBalance: action.payload
      };
    case types.IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload
      };
    default:
      return state;
  }
}
