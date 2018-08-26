#!/bin/bash

# check if mongo is installed
which mongo
if [ "$?" -ne 0 ]; then
  echo 'You need to install Mongo DB for initializing the project'
  exit 1
fi

which ipfs
if [ "$?" -ne 0 ]; then
  echo 'You need to install IPFS DB for initializing the project'
  exit 1
fi

which ganache-cli
if [ "$?" -ne 0 ]; then
  echo "You need to install ganache-cli for initializing the project"
  exit 1
fi

which node
if [ "$?" -ne 0 ]; then
  echo "You need to install Node.js for initializing the project"
  exit 1
fi

# start IPFS
gnome-terminal -x sh -c "ipfs daemon"

# load ganache
gnome-terminal -x sh -c "ganache-cli"

# migrate smart contract to ganache
truffle migrate --network ganache

# start truffle console
gnome-terminal -x sh -c "truffle console --network ganache"

# drop db if exist
mongo consensys_app --eval "db.dropDatabase()"

# Start offchain server
#gnome-terminal -x sh -c "nodemon server.js --no-optional"
gnome-terminal -x sh -c "nodemon --inspect=0.0.0.0:9229 server.js"

# seed the blockchain with data
truffle exec seed.js --network ganache

# start the web server
npm run start


