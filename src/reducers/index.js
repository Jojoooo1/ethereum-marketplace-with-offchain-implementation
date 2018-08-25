import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import userReducer from "../user/userReducer";
import { web3Reducer } from "../actions/web3/reducers";
import { AccountReducer } from "../actions/web3/reducers";
import activeProductReducer from "./reducer-active-product";
import productReducer from "./reducer-product";
import activeStoreReducer from "./reducer-active-store";
import myStoreReducer from "./reducer-my-store";
import storeReducer from "./reducer-store";
import adminReducer from "./reducer-admin";
import txReducer from "./reducer-tx";
import { reducerOrderBuyer, reducerOrderSeller, reducerOrderRefund } from "./reducer-order";
import reducerActiveOrder from "./reducer-active-order";
import reducerArbiter from "./reducer-arbiter";

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  account: AccountReducer,
  admins: adminReducer,
  product: activeProductReducer,
  products: productReducer,
  myStore: myStoreReducer,
  store: activeStoreReducer,
  stores: storeReducer,
  txEvent: txReducer,
  buyerOrders: reducerOrderBuyer,
  sellerOrders: reducerOrderSeller,
  order: reducerActiveOrder,
  arbiter: reducerArbiter,
  refundOrder: reducerOrderRefund
});

export default reducer;
