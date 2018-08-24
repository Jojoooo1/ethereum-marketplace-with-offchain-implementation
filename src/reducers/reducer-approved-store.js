import { AT_STORES } from "../actions/types/types-store";

export default function(state = [], action) {
  switch (action.type) {
    case AT_STORES.GET_ALL:
      return action.payload;
    default:
      return state;
  }
}
