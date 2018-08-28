# Design pattern solution

1. Implemented Ownable pattern to enable transfert ownership of the smart contract and enable to modify the escrow arbiter address for example.
2. Implemented Mortal pattern to be able to delete the smart contract and send the remaining fund to the corresponding owner of the smart contract.
3. Implemented Circuit Breaker pattern in order to be able to stop certain function call if the function `toggleContractActive` is called in case of a bug detection for example.
