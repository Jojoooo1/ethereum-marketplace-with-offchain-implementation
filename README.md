# H1 Marketplace created for consensys

**General description of the project**

It is a Marketplace administered by the creator of the contract. This Admin can add other admin and then this added admin can add other etc. Anyone can submit a store to be part of the marketplace. Admin need to approve the store in order for this store to be able to sell product. Admin can remove a store, by doing the following it will remove all corresponding products. Store owner can add/update/remove product, manage/update their store and corresponding orders. Image and description of the product/store are stored in your local IPFS server that can then be connected to external node. The hash of the location is stored in the Blockchain. When a product is bought the amount of ETH is stored in an escrow contract. When the two parties are agreed they can apply for the fund to be released. If a problem occur an arbiter can decide of the conclusion. The address of the arbiter is set at contract instantiation.

**Technical overview**

Front end has been build using React & redux. A Node.js Backend has been set to listen to blockchain event. When an event is caught the database update accordingly. The React application is mostly served by the backend in order to be able to have more complex request.

**Setup**

1. Install MongoDB community server (verify mongo is working by tipping `mongo` in your terminal)
2. Install IPFS
   ⋅⋅⋅config: in your terminal: `ipfs init && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]' && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods "[\"PUT\", \"POST\", \"GET\"]" && ipfs config --json API.HTTPHeaders.Access-Control-Allow-Credentials '["true"]'`
3. Execute init script in project folder: `./start.sh`
4. if navigator already started you need to close it and re connect to metamask. When connected, reload once the page and your ready to play. Cart icon that open a modal to buy the product sometime bug, you can either reload the page or go to the buy page (bootstrap problem probably)

**Test**

1. In your terminal: `NODE_ENV=test truffle test test/ecommerce_store.test.js --network ganache`


**Additional info**

I had not previous knowledge of Node.js and React, I mostly improved along the line and unfortunately I run out of time to refactor my code.
