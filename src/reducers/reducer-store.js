import { AT_STORES } from "../actions/types/types-store";

export default function(state = [], action) {
  switch (action.type) {
    case AT_STORES.GET_ALL:
      return action.payload;
    case AT_STORES.CREATE:
      return [...state, action.payload];
    case AT_STORES.DELETE:
      return state.filter(admin => {
        if (admin === action.payload) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
}
