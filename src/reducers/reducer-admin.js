import { AT_ADMINS } from "../actions/types/types-admin";

export default function(state = [], action) {
  switch (action.type) {
    case AT_ADMINS.GET_ALL:
      return action.payload;
    case AT_ADMINS.CREATE:
      return [...state, action.payload];
    case AT_ADMINS.DELETE:
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
