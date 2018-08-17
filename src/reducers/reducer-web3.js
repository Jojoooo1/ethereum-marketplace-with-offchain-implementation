import { AT_PRODUCTS } from "../actions/action-types";

const initialState = {
  web3: null
};

export default function(state = initialState, action) {
  if (action.type === AT_PRODUCTS.SET) {
    return {
      ...state,
      web3: action.payload
    };
  } else {
    return state;
  }
}
