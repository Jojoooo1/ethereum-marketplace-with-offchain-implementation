import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "../user/userReducer";
import productReducer from "./reducer-product";
import activeProductReducer from "./reducer-active-product";
import { web3Reducer } from '../actions/web3/reducers';

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  products: productReducer,
  product: activeProductReducer,
    web3: web3Reducer
});

export default reducer;
