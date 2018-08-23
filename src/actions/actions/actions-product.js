import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_PRODUCTS } from "../types/types-product";
import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getProductsByOwner() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/products`)
      .then(function(response) {
        dispatch({ type: AT_PRODUCTS.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function getProductByStoreAddress(address) {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/stores-address/${address}/products/`)
      .then(function(response) {
        console.log(response.data);
        dispatch({ type: AT_PRODUCTS.GET_BY_STORE, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function removeProduct(productId) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      f.removeProduct(productId, { from: walletAddress, gas: 200000 }).then(function(tx) {
        dispatch({ type: "TX_EVENT", payload: tx.logs[0].event });
      });
    });
  };
}

// export function getProductById(id) {
//   let web3 = store.getState().web3.web3;
//   EcommerceStore.setProvider(web3.currentProvider);

//   return function(dispatch) {
//     EcommerceStore.deployed().then(function(f) {
//       f.getProduct
//         .call(id)
//         .then(function(product) {
//           return product;
//         })
//         .then(function(product) {
//           console.log(product);
//           dispatch({ type: AT_PRODUCTS.READ, payload: product });
//         });
//     });
//   };
// }

// export function getProductsByOwner() {
//   var instance;
//   let web3 = store.getState().web3.web3;
//   EcommerceStore.setProvider(web3.currentProvider);

//   return function(dispatch) {
//     EcommerceStore.deployed()
//       .then(function(f) {
//         instance = f;
//         return instance.productIndex.call();
//       })
//       .then(function(productCount) {
//         for (var i = 0; i < productCount; i++) {
//           instance.getProduct
//             .call(i)
//             .then(function(product) {
//               return product;
//             })
//             .then(function(product) {
//               dispatch({ type: AT_PRODUCTS.READ_ALL, payload: product });
//             });
//         }
//       });
//   };
// }
