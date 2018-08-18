import { AT_PRODUCTS } from "../actions/action-types";

export default function(state = [], action) {
  switch (action.type) {
    case AT_PRODUCTS.READ_ALL:
      return [...state, action.payload];
    case AT_PRODUCTS.DELETE:
      return state.filter(post => {
        if (post === action.payload) {
          return false;
        } else {
          return true;
        }
      });
    case AT_PRODUCTS.CREATE:
      return [...state, action.payload];
    default:
      return state;
  }
}
