import { AT_STORES } from "../actions/types/types-store";

export default function(state = {}, action) {
  if (action.type === AT_STORES.GET) {
    return action.payload;
  } else {
    return state;
  }
}
