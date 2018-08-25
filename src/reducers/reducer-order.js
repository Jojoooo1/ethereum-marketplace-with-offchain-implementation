import { AT_ORDERS } from "../actions/types/types-order";

export function reducerOrderBuyer(state = [], action) {
  switch (action.type) {
    case AT_ORDERS.GET_BUYER_ORDERS:
      return action.payload;
    default:
      return state;
  }
}

export function reducerOrderSeller(state = [], action) {
  switch (action.type) {
    case AT_ORDERS.GET_SELLER_ORDERS:
      return action.payload;
    default:
      return state;
  }
}

export function reducerOrderRefund(state = [], action) {
  switch (action.type) {
    case AT_ORDERS.GET_REFUNDING_ORDERS:
      return action.payload;
    default:
      return state;
  }
}
