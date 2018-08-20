import { AT_PRODUCTS } from "../actions/types/types-product";

export default function(state = [], action) {
  switch (action.type) {
    case AT_PRODUCTS.GET_ALL:
      return action.payload;
    case AT_PRODUCTS.CREATE:
      return [...state, action.payload];
    case AT_PRODUCTS.DELETE:
      return state.filter(product => {
        if (product === action.payload) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
}
