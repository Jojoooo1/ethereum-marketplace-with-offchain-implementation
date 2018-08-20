import { AT_TX } from "../actions/types/types-tx";

export default function(state = {}, action) {
  if (action.type === AT_TX.TX_RESPONSE) {
    return action.payload;
  } else {
    return state;
  }
}
