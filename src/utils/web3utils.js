// ethjs wrap
import Web3 from "web3";

/* eslint-disable import/no-mutable-exports */
let web3 = null;
let account;
let waitForReceipt = null;
/* eslint-enable import/no-mutable-exports */

// follow https://github.com/ethereum/wiki/wiki/JavaScript-API
if (typeof window.web3 !== "undefined") {
  // get ethjs object
  web3 = new Web3(window.web3.currentProvider);
  console.log("Injected web3 detected.");
  account = web3.eth.accounts[0];
} else {
  // Fallback to localhost if no web3 injection. We've configured this to
  // use the development console's port by default.
  var provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
  web3 = new Web3(provider);
  account = web3.eth.accounts[0];
  console.log("No web3 instance injected, using Local web3.");
}

export { account, waitForReceipt, web3 };
