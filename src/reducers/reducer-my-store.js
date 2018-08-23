import { AT_STORES } from "../actions/types/types-store";

export default function(state = null, action) {
  if (action.type === AT_STORES.GET_MY_STORE) {
    return action.payload;
  } else {
    return state;
  }
}
