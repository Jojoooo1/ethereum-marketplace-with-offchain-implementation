// // import axios from "axios";
// // import { AT_STORES } from "../types/index";

// // const END_POINT = "http://localhost:3001";
// import store from "../../store";

// // import getWeb3 from "./utils/getWeb3";
// import contract from "truffle-contract";
// import ecommerce_store_artifacts from "../../build/contracts/EcommerceStore.json";

// const EcommerceStore = contract(ecommerce_store_artifacts);

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


