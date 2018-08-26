import { uport } from "./../../../utils/connectors.js";
import { browserHistory } from "react-router";

export const USER_LOGGED_IN = "USER_LOGGED_IN";
export function userLoggedIn(user) {
  return {
    type: USER_LOGGED_IN,
    payload: user
  };
}

export function loginUser() {
  return function(dispatch) {
    // UPort and its web3 instance are defined in ./../../../util/wrappers.
    // Request uPort persona of account passed via QR
    uport.requestCredentials().then(credentials => {
      dispatch(userLoggedIn(credentials));
      console.log(credentials);
      let sessionCredentials = JSON.stringify(credentials);
      sessionStorage.setItem("userData", sessionCredentials);
    });
  };
}
