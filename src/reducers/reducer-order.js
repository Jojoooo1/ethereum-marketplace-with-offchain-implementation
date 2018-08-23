import { AT_ORDERS } from "../actions/types/types-order";

export default function(state = [], action) {
  switch (action.type) {
    case AT_ORDERS.GET_ALL:
      return action.payload;
    default:
      return state;
  }
}
