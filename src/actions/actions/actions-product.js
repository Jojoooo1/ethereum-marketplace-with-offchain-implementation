// import axios from "axios";
// const END_POINT = "http://localhost:3001";

import { AT_PRODUCTS } from "../types/types-product";
import store from "../../store";

import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getProductsByOwner() {
  var instance;
  let web3 = store.getState().web3.web3;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed()
      .then(function(f) {
        instance = f;
        return instance.productIndex.call();
      })
      .then(function(productCount) {
        for (var i = 0; i < productCount; i++) {
          instance.getProduct
            .call(i)
            .then(function(product) {
              return product;
            })
            .then(function(product) {
              dispatch({ type: AT_PRODUCTS.READ_ALL, payload: product });
            });
        }
      });
  };
}

export function getProductById(id) {
  let web3 = store.getState().web3.web3;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    EcommerceStore.deployed().then(function(f) {
      f.getProduct
        .call(id)
        .then(function(product) {
          return product;
        })
        .then(function(product) {
          console.log(product);
          dispatch({ type: AT_PRODUCTS.READ, payload: product });
        });
    });
  };
}

// export function deletePost(post) {
//   return function(dispatch) {
//     axios
//       .delete(`${END_POINT}/products/${post.id}`)
//       .then(function(response) {
//         console.log(response);
//         dispatch({ type: AT_PRODUCTS.DELETE, payload: post });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };
// }

// export function createPost(post) {
//   return function(dispatch) {
//     axios
//       .post(`${END_POINT}/products/`, {
//         title: post.title,
//         content: post.content,
//         author: post.author
//       })
//       .then(response => {
//         dispatch({ type: AT_PRODUCTS.CREATE, payload: response.data });
//       })
//       .catch(function(error) {
//         console.log(error);
//       });
//   };
// }
