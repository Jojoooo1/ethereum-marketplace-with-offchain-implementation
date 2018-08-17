import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "../user/userReducer";
import productReducer from "./reducer-product";
import activeProductReducer from "./reducer-active-product";

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  products: productReducer,
  product: activeProductReducer
});

export default reducer;
