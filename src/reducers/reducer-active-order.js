import { AT_ORDERS } from "../actions/types/types-order";

export default function(state = {}, action) {
  if (action.type === AT_ORDERS.GET_ORDER) {
    return action.payload;
  } else {
    return state;
  }
}
