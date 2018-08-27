# Marketplace created for consensys

**General description**

My final project is a Marketplace administered by the creator of the smart contract. This Admin can add/remove other admin and then this added admin can add/remove other etc. Anyone can submit a store to be part of the marketplace. Admin need to approve the store in order for the store to be able to create/sell product. Admin can remove a store, by doing the following it will remove all corresponding products. Store owner can add/update/remove product, manage/update their store and corresponding orders. Image and description of the product/store are stored in your local IPFS server that can then be connected to external node. The hash of the image/description is stored in the Blockchain. When a product is bought the amount of ETH is stored in an escrow contract. When the two parties are agreed they can apply for the fund to be released. If a problem occur an arbiter can decide of the conclusion. The address of the arbiter is set at contract instantiation. Product that has a quantity equal to 0 are not displayed.

**Technical overview**

Front end has been build using React & redux. A Node.js Backend has been set to listen to blockchain event. When an event is caught up the database update accordingly. The React application is mostly served by the offchain backend in order to create and serve more complex request. Uport Login has been integrated on a very simple manner only to serve login purpose. The Uport data is saved in the browser session storage.

**Setup**

1. Install ganache-cli
2. Install truffle
3. Install MongoDB community server (verify mongo is working by tipping `mongo` in your terminal)
4. Install IPFS
   then config your IPFS server (allow file to be server from any site) by tipping in your terminal: `ipfs init && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"PUT\", \"POST\", \"GET\"]" && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'`
5. Execute init script in project folder to start all the differents servers: `./start.sh`
6. if navigator already started you need to close it and re connect to metamask. When connected, reload once the page and your ready to play.

**Test**

1. In your terminal: `ganache-cli`
2. In your terminal: `NODE_ENV=test truffle test test/ecommerce_store.test.js --network ganache`

**Additional note**

I had no previous experience of Node.js and React.js, I mostly improved along the line and unfortunately I run out of time to refactor all my code. If you don't receive the data anymore verify the node server is not down. If down restart by tipping `node server.js` in the directory server (if the process did not ended well try restarting the app `./start.sh`). I could have added more test to really test all the scenarios but again time was missing. If you add a very short description of product or store ipfs js library might threw an error when trying to render. Cart icon that open a modal to buy product sometime bug, you can either try click multiple time to open, reload the page or go to the buy page (probably bootstrap modal problem)

