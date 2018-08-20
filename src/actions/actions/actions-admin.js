import axios from "axios";
const END_POINT = "http://localhost:4005/api";

import { AT_ADMINS } from "../types/types-admin";
import store from "../../store";

// import getWeb3 from "./utils/getWeb3";
import contract from "truffle-contract";
import ecommerce_store_artifacts from "../../../build/contracts/EcommerceStore.json";
const EcommerceStore = contract(ecommerce_store_artifacts);

export function getAdmins() {
  return function(dispatch) {
    axios
      .get(`${END_POINT}/admins`)
      .then(function(response) {
        dispatch({ type: AT_ADMINS.GET_ALL, payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function addAdmin(address) {
  let web3 = store.getState().web3.web3;
  let walletAddress = store.getState().account.walletAddress;
  EcommerceStore.setProvider(web3.currentProvider);

  return function(dispatch) {
    return EcommerceStore.deployed().then(function(f) {
      let txObject
      let instance = f;
      f.addAdmin(address, { from: walletAddress, gas: 200000 }).then(function(tx) {
        txObject = tx
        instance.NewAdmin().watch(function(error, result) {
          if (result.event === "NewAdmin") {
            let newAddress = { address: result.args._address };
            dispatch({ type: AT_ADMINS.CREATE, payload: newAddress });
          }
          // dispatch({ type: "TX_RESPONSE", payload: tx });
        });
      });
      return txObject
    });
  };
}

// EcommerceStore.deployed().then(function(i) {
//   i.addAdmin("0x057b57edb53277834fd8a80cd272debd3efe0f73").then(function(f) {
//     console.log(f);
//   });
// });

// export function removeAdmin(address) {
//   let web3 = store.getState().web3.web3;
//   EcommerceStore.setProvider(web3.currentProvider);

//   return function(dispatch) {
//     EcommerceStore.deployed().then(function(f) {
//       f.removeAdmin
//         .call(address)
//         .then(function(log) {
//           console.log(log)
//           return log;
//         })
//         .then(function(admin) {
//           console.log(admin);
//           dispatch({ type: AT_ADMINS.DELETE, payload: admin });
//         });
//     });
//   };
// }
